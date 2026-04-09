Feature: Criação de saida de produto

Scenario: Saida criada com sucesso
  Given que criei um produto, uma entrada e um pedido para saida 
  When navego para a tela de nova saida
  And preencho os dados da saida com o barcode do produto e a quantidade deve ser menor ou igual que o estoque
  And solicito a criação da saida
  Then devo ver os detalhes da saida criada
  And o estoque do produto deve estar atualizado na saida

Scenario: Erro ao criar a saida quando o numero de produtos é maior que o estoque
  Given que criei um produto, uma entrada e um pedido para saida erro
  When navego para a tela de nova saida erro
  And preencho os dados da saida com o barcode do produto e a quantidade maior que o estoque
  And solicito a criação da saida erro
  Then devo ver a mensagem de erro que a saida é maior que o estoque
