# Automated Essay Scorer Using Natural Language Processing Techniques and Random Forests

---

### Summary

Some assessment exams such as the GMAT or the TOEFL require the candidate to write an essay answering a specific topic. These essays are corrected by professional evaluators but also by automatic evaluators: software that analyzes the essay and grades it automatically. These software are already widely used and studies show that they are already capable of reaching or surpassing a human evaluator. On the other hand, the gains in scale and cost reduction are gigantic.

This work aims to develop a proof of concept of an automatic essay evaluation software that is capable of demonstrating acceptable results and that can serve as a basis for building a more robust tool that can be used on a large scale in practical applications.

A simple website was developed in which the user can fill in the essay and receive a corresponding score in return. On the server, an application receives the essay text, makes the appropriate modeling and calculates the prediction of the corresponding result (score).

As methodology, NLP techniques were used for text processing and features generation. Two groups of features were generated: i) meta features: data such as: text size, number of words, number of sentences, percentage of grammatical errors, percentage of writing errors, etc. ii) vector features: representation of the text in document embeddings . For modeling, a regressor based on the Random Forests method was used.

---

## Getting Started

These are the instructions on setting up your project locally.
To get a local copy up and running follow these simple steps.

### Prerequisites

Here are the things you need to use the software and how to install them.
* node
  1. Access Node.js [website](https://nodejs.org/) for installation instructions
  2. Check installation using `node -v`
  3. Make sure you are running version 14 or higher

* npm
  1. npm is bundled with node.
  2. Check installation using `node -v`
  3. Make sure you are running version 6 or higher
  
* yarn 
   1. Once you have npm installed you can run the following both to install and upgrade Yarn:
   ```sh
   npm install --global yarn
   ```
* python
   1. Access [python.org](https://www.python.org/) for installation instructions
   2. Check installation using `python -V`
   3. Make sure you are running version 3.7 or higher

* virtualenv
   1. Once you have python installed install run the following command to install virtualenv:
   ```sh
   pip install virtualenv
   ```

### Installation

1. Clone the repo and cd into directory
   ```sh
   git clone https://github.com/bgarrofe/essay-grader.git
   cd essay-grader
   ```
2. Install packages using npm or yarn (preferred)
   ```sh
   yarn
   # or
   npm install 
   ```
3. Create virtual environment and activate
   ```sh
   virtualenv env
   env\Scripts\activate.bat # Windows
   # or
   source env\bin\activate # Linux
   ```
4. Install python dependencies
   ```sh
   pip install -r requirements.txt
   ```


## Running

To run the application you need to start the backend server using python and the next.js frontend application using node.
1. To start the backend server run:
   ```sh
   flask run
   ```
2. Server will be started on port 5000 by default
3. To start the frontend application run:
   ```sh
   yarn dev
   # or
   npm run dev
   ```
4. The frontend application will be started on port 3000 by default
5. Access http://localhost:3000 to use the application

_For more examples, please refer to the [Documentation](https://example.com)_


## License

Distributed under the MIT License. See `LICENSE` for more information.


## Contact

Bruno Garrofé - [website](https://garrofe.org/) - bruno dot garrofe at gmail dot com

Project Link: [https://github.com/bgarrofe/essay-grader](https://github.com/bgarrofe/essay-grader)
