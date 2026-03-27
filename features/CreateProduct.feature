Feature: Cadastro de produto

Scenario: Cadastro com sucesso
  Given que estou na tela de cadastro
  When preencho os dados do produto
  And solicito o cadastro
  Then devo ver os dados do produto cadastrado com estoque = 0
  And devo ver o produto na lista de produtos

Scenario: Erro ao cadastrar sem barcode
  Given que estou na tela de cadastro visando o erro
  When preencho os dados do produto sem fornecer o barcode
  And solicito o cadastro clicando no botao
  Then devo ver uma mensagem de erro