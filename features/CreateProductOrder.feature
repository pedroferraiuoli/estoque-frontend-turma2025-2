Feature: Cadastro de pedido de produto

Scenario: Cadastro com sucesso
  Given que estou na tela de criacao de pedido
  When preencho os dados do pedido
  And solicito a criacao do pedido
  Then devo ver os dados do pedido cadastrado com status = opened
  And devo ver o pedido na lista de pedidos de produtos

Scenario: Erro ao cadastrar com produto inexistente
  Given que estou na tela de criacao de pedido
  When preencho os dados do pedido fornecendo um produto inexistente
  And solicito a criacao do pedido
  Then devo ver uma mensagem de erro por produto inexistente