from flask import Flask, request, jsonify
from flask_socketio import SocketIO, emit
from flask_cors import CORS  # Add this import
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import Select
from selenium.webdriver.common.action_chains import ActionChains
import time
import json
from bs4 import BeautifulSoup

app = Flask(__name__)
CORS(app)  # Add this line to enable CORS
socketio = SocketIO(app, cors_allowed_origins="*")

class GPTResearcherAutomation:
    def __init__(self, socketio, session_id):
        chrome_options = webdriver.ChromeOptions()
        chrome_options.add_argument('--start-maximized')
        chrome_options.add_argument('--headless')  # Add this line for headless mode
        chrome_options.add_argument('--disable-gpu')  # Add this line to disable GPU
        chrome_options.add_argument('--no-sandbox')  # Add this line to bypass OS security model
        chrome_options.add_argument('--disable-dev-shm-usage')  # Add this line to overcome limited resource problems
        self.driver = webdriver.Chrome(options=chrome_options)
        self.base_url = "http://tapi.merai.cloud:8000/#form"
        self.status_history = []
        self.last_content = ""
        self.socketio = socketio
        self.session_id = session_id

    def log_status(self, status):
        timestamp = time.strftime("%Y-%m-%d %H:%M:%S")
        status_entry = {
            "timestamp": timestamp,
            "status": status
        }
        self.status_history.append(status_entry)
        print(f"[{timestamp}] {status}")
        
        # Emit the log to the frontend in real-time via WebSocket
        self.socketio.emit('log', {'message': f"[{timestamp}] {status}"}, room=self.session_id)

    def setup(self):
        self.driver.get(self.base_url)
        self.log_status("Initializing browser and loading page")
        time.sleep(3)
        
    def check_content_updates(self):
        """Monitor and log changes in the output div"""
        try:
            output_div = self.driver.find_element(By.ID, "output")
            current_content = output_div.get_attribute('innerHTML')
            
            if current_content != self.last_content:
                # Parse HTML to get text content
                soup = BeautifulSoup(current_content, 'html.parser')
                agent_responses = soup.find_all(class_='agent_response')
                
                for response in agent_responses:
                    response_text = response.text.strip()
                    if response_text and response_text not in [entry['status'] for entry in self.status_history]:
                        self.log_status(f"Agent Update: {response_text}")
                
                self.last_content = current_content
                return True
            return False
        except Exception as e:
            return False

    def submit_query(self, query, report_type="research_report", tone="Objective", source="web"):
        try:
            self.log_status(f"Preparing to submit query: {query}")
            
            wait = WebDriverWait(self.driver, 10)
            
            # Fill form fields
            task_input = wait.until(EC.presence_of_element_located((By.ID, "task")))
            task_input.clear()
            task_input.send_keys(query)
            self.log_status("Query entered into form")
            
            report_select = Select(self.driver.find_element(By.NAME, "report_type"))
            report_select.select_by_value(report_type)
            self.log_status(f"Report type selected: {report_type}")
            
            tone_select = Select(self.driver.find_element(By.ID, "tone"))
            tone_select.select_by_value(tone)
            self.log_status(f"Tone selected: {tone}")
            
            source_select = Select(self.driver.find_element(By.NAME, "report_source"))
            source_select.select_by_value(source)
            self.log_status(f"Source selected: {source}")
            
            # Submit form using JavaScript
            submit_button = self.driver.find_element(By.CSS_SELECTOR, "input[type='submit']")
            try:
                submit_button.click()
            except:
                self.log_status("Standard click failed, trying alternative methods...")
                try:
                    self.driver.execute_script("arguments[0].click();", submit_button)
                except Exception as e:
                    self.log_status(f"Failed to submit form: {str(e)}")
                    return False
                
            self.log_status("Query submitted successfully")
            self.log_status("Research process started")
            
            # Wait for initial output
            wait.until(EC.visibility_of_element_located((By.ID, "output")))
            return True
            
        except Exception as e:
            self.log_status(f"Error submitting query: {str(e)}")
            return False

    def wait_for_results(self, timeout=1200):
        try:
            start_time = time.time()
            last_update_time = time.time()

            while time.time() - start_time < timeout:
                # Check for content updates
                if self.check_content_updates():
                    last_update_time = time.time()
                    self.log_status("Content updated!")

                # Check for report completion by looking for content in report container
                try:
                    report_container = self.driver.find_element(By.ID, "reportContainer")
                    content = report_container.text.strip()

                    if content and len(content) > 100:  # Check if content length is appropriate
                        self.log_status("Research report generated")
                        # Only return the result if content is generated
                        return {
                            "content": content,
                            "status_history": self.status_history
                        }
                except Exception as e:
                    self.log_status(f"Error checking report container: {str(e)}")

                # Check for timeout without updates
                if time.time() - last_update_time > 60:  # No updates for 1 minute
                    # self.log_status("No updates received for 60 seconds")
                    # Stop scraping and send a success message
                    return {
                        "content": "No further updates received. Stopping scraping.",
                        "status_history": self.status_history
                    }

                time.sleep(1)

            # If the loop finishes without generating results, we log the timeout and raise an exception
            self.log_status("Research timed out")
            raise TimeoutError("Report generation timed out")

        except Exception as e:
            self.log_status(f"Error during research: {str(e)}")
            return None

    def close(self):
        self.log_status("Closing browser session")
        self.driver.quit()

@app.route("/live", methods = ["GET"])
def hello():
    return jsonify({"status": "Server is live"}), 200

@app.route("/run_research", methods=["POST"])
def run_research():
    data = request.json
    query = data.get("query", "")
    report_type = data.get("report_type", "research_report")
    tone = data.get("tone", "Objective")
    source = data.get("source", "web")
    
    if not query:
        return jsonify({"error": "Query is required"}), 400

    session_id = request.args.get('session_id')
    researcher = GPTResearcherAutomation(socketio, session_id)
    try:
        researcher.setup()
        if researcher.submit_query(query, report_type=report_type, tone=tone, source=source):
            results = researcher.wait_for_results()
            if results:
                return jsonify({
                    "status": "success",
                    "results": results["content"],
                    "status_history": results["status_history"]
                }), 200
            else:
                return jsonify({"status": "error", "message": "No results generated"}), 500
        else:
            return jsonify({"status": "error", "message": "Failed to submit query"}), 500
    finally:
        researcher.close()

# WebSocket route for client to connect and listen for logs
@socketio.on('connect')
def handle_connect():
    session_id = request.args.get('session_id')
    print(f"Client connected with session ID: {session_id}")
    emit('log', {'message': 'Connection established, waiting for logs...'})

# Starting Flask-SocketIO server
if __name__ == "__main__":
    socketio.run(app, debug=True, host="0.0.0.0", port=9900, allow_unsafe_werkzeug=True)
