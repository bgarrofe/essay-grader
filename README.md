# Corretor Automático de Redações Utilizando Técnicas de Processamento de Linguagem Natural e Random Forests

#### Aluno: [Bruno Garrofé Sampaio](https://github.com/bgarrofe).
#### Orientador: [Leonardo Forero Mendoza](https://github.com/leofome8/).

---

Trabalho apresentado ao curso [BI MASTER](https://ica.puc-rio.ai/bi-master) como pré-requisito para conclusão de curso e obtenção de crédito na disciplina "Projetos de Sistemas Inteligentes de Apoio à Decisão".

---

### Resumo

Alguns exames de avaliação como o GMAT ou o TOEFL exigem que o candidato elabore uma redação respondendo a um tema específico. Essas redações são corrigidas por avaliadores profissionais mas também por avaliadores automáticos: softwares que analisam a redação e dão notas automaticamente. Esses softwares já são amplamente utilizados e estudos mostram já ser capaz de atingir ou superar um avaliador humano. Por outro lado, os ganhos em escala e redução de custos são gigantescos. 

O trabalho em questão visa desenvolver uma prova de conceito de um software de avaliação automática de redações que seja capaz de demonstrar resultados aceitáveis e que possa servir como base para construção de uma ferramenta mais robusta e passível de utilizaçaõ em larga escala em aplicações práticas. 

Foi desenvolvido um website simples em que o usuário pode fazer o preenchimento da redação receber como retorno uma nota correspondente. No servidor, rodará uma aplicação que recebe o texto da redação fazendo as devidas modelagens e inferência para predição do resultado (score) correspondente. 

Como metodologia, foram utilizadas técnicas de NLP para tratamento dos textos e geração das features. Foram gerados 2 grupos de features: i) meta features: dados como: tamanho do texto, número de palavras, número de sentenças, percentual de erros gramaticais, percentual de erros de escrita, etc ii) vector features: representação do texto em document embeddings. Para modelagem foi utilizado um regressor com base na metodo de Random Forests.

---

Matrícula: 151.898.004

Pontifícia Universidade Católica do Rio de Janeiro

Curso de Pós Graduação *Business Intelligence Master*

<!-- GETTING STARTED -->
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


<!-- USAGE EXAMPLES -->
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

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->
## Contact

Bruno Garrofé - [website](https://garrofe.org/) - bruno dot garrofe at gmail dot com

Project Link: [https://github.com/bgarrofe/essay-grader](https://github.com/bgarrofe/essay-grader)

