import uuid
import inspect
from datetime import datetime

BL = '\033[30m'  # Black
R = '\033[31m'  # Red
G = '\033[32m'  # Green
Y = '\033[33m'  # Yellow
B = '\033[34m'  # Blue
M = '\033[35m'  # Magenta
C = '\033[36m'  # Cian
W = '\033[37m'  # White
RS = '\033[39m'  # Reset

class Logger():
    
    def __init__(self) -> None:
        pass 

    
        
    def info(self, message):

        # Get the name of the file that calls the function
        frame_info = inspect.stack()[1]
        calling_module = inspect.getmodule(frame_info[0])
        calling_file = calling_module.__file__
        
        file_name = str(frame_info[1]).split("\\")[-1]
        file_line = frame_info[2]
        
        id = str(uuid.uuid4())
        date = datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%S.%fZ')

        print(f"{B}[INFO] {date} | {file_name}:{file_line} |{W} {id}:{RS} {message}\n")

    def error(self, error, errorMessage=""):
        
        # Get the name of the file that calls the function
        frame_info = inspect.stack()[1]
        calling_module = inspect.getmodule(frame_info[0])
        calling_file = calling_module.__file__
        
        file_name = str(frame_info[1]).split("\\")[-1]
        file_line = frame_info[2]

        id = str(uuid.uuid4())
        date = datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%S.%fZ')

        print(f"\n{R}[ERROR] {date} | {file_name}:{file_line} {calling_file} |{W} {id}:{RS}\n{errorMessage}\n{error}\n")

    def critical(self, message):
        
        # Get the name of the file that calls the function
        frame_info = inspect.stack()[1]
        calling_module = inspect.getmodule(frame_info[0])
        calling_file = calling_module.__file__

        file_name = str(frame_info[1]).split("\\")[-1]
        file_line = frame_info[2]

        id = str(uuid.uuid4())
        date = datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%S.%fZ')

        print(f"{R}[WARNING] {date} | {calling_file} |{W} {id}:{RS} \n{message}\n")