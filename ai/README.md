# AI project

This directory contains scripts and files related to the AI part of the ESP project. The main script, [predict.py](./predict.py), utilizes a pre-trained deep learning model to classify waste into various categories such as cardboard, glass, metal, paper, plastic, and trash. The model is provided in the file `trash_detection_model.keras` and the [dataset here](./dataset/).

## Installation

To set up the AI part, follow these steps:

3. Create and activate a virtual environment (optional but recommended):

   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

4. Install the required dependencies using pip:

   ```bash
   pip install -r requirements.txt
   ```

5. Run the `predict.py` script to classify waste:

   ```bash
   python predict.py path/to/your/image.jpg
   ```

6. Once you're done, deactivate the virtual environment:

   ```bash
   deactivate
   ```

That's it! You have now successfully installed and used the waste detection system.
