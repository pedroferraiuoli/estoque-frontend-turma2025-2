import { test, expect } from '@playwright/test';

test('Deve criar uma saida de produto e verificar o estoque atualizado', async ({ page }) => {

  const barcode: number = Date.now();
  const productName = 'Chocolate' + barcode.toString();

  // 0) Deletar produto
  // Aqui deleta o produto de teste, mas a função não existe;

  // 1) Criar o Produto
  await page.goto('/');
  await page.getByRole('link', { name: 'Produtos', exact: true }).click();
  await page.getByRole('link', { name: 'Novo Produto' }).click();
  await page.waitForTimeout(500);
  await page.getByRole('textbox', { name: 'Código de Barras' }).fill(barcode.toString());
  await page.getByRole('textbox', { name: 'Nome' }).fill(productName);
  await page.getByRole('spinbutton', { name: 'Dias de Referência' }).fill('30');
  await page.getByRole('button', { name: 'Criar Produto' }).click();
  await page.waitForTimeout(2000);
  // await expect(page.getByText('Produto criado com sucesso!')).toBeVisible();
  // await expect(page.getByTestId('product-quantity')).toHaveText('0');

  // 2) Criar o Pedido
  await page.getByRole('link', { name: 'Pedidos', exact: true }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('link', { name: 'Novo Pedido' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: 'Código de Barras do Produto' }).fill(barcode.toString());
  await page.getByRole('spinbutton', { name: 'Quantidade' }).fill('100');
  await page.locator('#orderDate').fill('2025-07-10T10:00');
  await page.getByRole('button', { name: 'Criar Pedido' }).click();
  await page.waitForTimeout(2000);

  // Capturar o UUID do pedido na página de detalhes
  const orderUuid = await page.locator('.detail-item strong').first().innerText();

  // 3) Criar a Entrada
  await page.getByRole('link', { name: 'Entradas', exact: true }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('link', { name: 'Nova Entrada' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: 'UUID do Pedido' }).fill(orderUuid);
  await page.getByRole('spinbutton', { name: 'Quantidade' }).fill('100');
  await page.locator('#inputDate').fill('2025-07-15T10:00');
  await page.getByRole('button', { name: 'Criar Entrada' }).click();
  await page.waitForTimeout(2000);

  // Verificar que a entrada foi criada com sucesso
  // await expect(page.getByText('Entrada criada com sucesso!')).toBeVisible();
  // await expect(page.getByTestId('input-quantity')).toHaveText('100');

  // 4) Verificar que o estoque do produto foi atualizado
  // await page.getByRole('link', { name: 'Produtos', exact: true }).click();
  // await page.waitForTimeout(2000);
  // await page.getByRole('link', { name: 'Detalhes' }).filter({ has: page.locator(`xpath=ancestor::tr[contains(., "${barcode}")]`) }).first().click();
  // await page.waitForTimeout(2000);

  // O estoque deve ser 10 agora (era 0, entrada de 10)
  // await expect(page.getByTestId('product-quantity')).toHaveText('10');

  // 5) Verificar que a entrada aparece na lista de entradas
  // await page.getByRole('link', { name: 'Entradas', exact: true }).click();
  // await page.waitForTimeout(2000);
  // await expect(page.getByText(orderUuid).first()).toBeVisible();

  // 3) Criar a Saida
  await page.getByRole('link', { name: 'Saídas', exact: true }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('link', { name: 'Nova Saida' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: 'Código de Barras do Produto' }).fill(barcode.toString());
  await page.getByRole('spinbutton', { name: 'Quantidade' }).fill('86');
  await page.locator('#outputDate').fill('2025-07-15T10:00');
  await page.getByRole('button', { name: 'Criar Saída' }).click();
  await page.waitForTimeout(2000);

  // Verificar que a saida foi criada com sucesso
  await expect(page.getByText('Saída criada com sucesso!')).toBeVisible();
  await expect(page.getByTestId('output-quantity')).toHaveText('86');

  // 4) Verificar que o estoque do produto foi atualizad
  await page.getByRole('link', { name: 'Produtos', exact: true }).click();
  await page.waitForTimeout(2000);
  await page.getByRole('link', { name: 'Detalhes' }).filter({ has: page.locator(`xpath=ancestor::tr[contains(., "${barcode}")]`) }).first().click();
  await page.waitForTimeout(2000);

  // O estoque deve ser 14 agora (era 100, saida de 86)
  await expect(page.getByTestId('product-quantity')).toHaveText('14');

});

test('Deve retornar erro ao criar saida com o numero de produtos maior que o estoque', async ({ page }) => {

  const barcode: number = Date.now();
  const productName = 'Chocolate' + barcode.toString();

  // 0) Deletar produto
  // Aqui deleta o produto de teste, mas a função não existe;

  // 1) Criar o Produto
  await page.goto('/');
  await page.getByRole('link', { name: 'Produtos', exact: true }).click();
  await page.getByRole('link', { name: 'Novo Produto' }).click();
  await page.waitForTimeout(500);
  await page.getByRole('textbox', { name: 'Código de Barras' }).fill(barcode.toString());
  await page.getByRole('textbox', { name: 'Nome' }).fill(productName);
  await page.getByRole('spinbutton', { name: 'Dias de Referência' }).fill('30');
  await page.getByRole('button', { name: 'Criar Produto' }).click();
  await page.waitForTimeout(2000);
  // await expect(page.getByText('Produto criado com sucesso!')).toBeVisible();
  // await expect(page.getByTestId('product-quantity')).toHaveText('0');

  // 2) Criar o Pedido
  await page.getByRole('link', { name: 'Pedidos', exact: true }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('link', { name: 'Novo Pedido' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: 'Código de Barras do Produto' }).fill(barcode.toString());
  await page.getByRole('spinbutton', { name: 'Quantidade' }).fill('100');
  await page.locator('#orderDate').fill('2025-07-10T10:00');
  await page.getByRole('button', { name: 'Criar Pedido' }).click();
  await page.waitForTimeout(2000);

  // Capturar o UUID do pedido na página de detalhes
  const orderUuid = await page.locator('.detail-item strong').first().innerText();

  // 3) Criar a Entrada
  await page.getByRole('link', { name: 'Entradas', exact: true }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('link', { name: 'Nova Entrada' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: 'UUID do Pedido' }).fill(orderUuid);
  await page.getByRole('spinbutton', { name: 'Quantidade' }).fill('100');
  await page.locator('#inputDate').fill('2025-07-15T10:00');
  await page.getByRole('button', { name: 'Criar Entrada' }).click();
  await page.waitForTimeout(2000);

  // Verificar que a entrada foi criada com sucesso
  // await expect(page.getByText('Entrada criada com sucesso!')).toBeVisible();
  // await expect(page.getByTestId('input-quantity')).toHaveText('100');

  // 4) Verificar que o estoque do produto foi atualizado
  // await page.getByRole('link', { name: 'Produtos', exact: true }).click();
  // await page.waitForTimeout(2000);
  // await page.getByRole('link', { name: 'Detalhes' }).filter({ has: page.locator(`xpath=ancestor::tr[contains(., "${barcode}")]`) }).first().click();
  // await page.waitForTimeout(2000);

  // O estoque deve ser 10 agora (era 0, entrada de 10)
  // await expect(page.getByTestId('product-quantity')).toHaveText('10');

  // 5) Verificar que a entrada aparece na lista de entradas
  // await page.getByRole('link', { name: 'Entradas', exact: true }).click();
  // await page.waitForTimeout(2000);
  // await expect(page.getByText(orderUuid).first()).toBeVisible();

  // 3) Criar a Saida
  await page.getByRole('link', { name: 'Saídas', exact: true }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('link', { name: 'Nova Saida' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: 'Código de Barras do Produto' }).fill(barcode.toString());
  await page.getByRole('spinbutton', { name: 'Quantidade' }).fill('110');
  await page.locator('#outputDate').fill('2025-07-15T10:00');
  await page.getByRole('button', { name: 'Criar Saída' }).click();
  await page.waitForTimeout(2000);

  // Verificar que a saida foi criada com sucesso
  await expect(page.getByText('Insufficient stock for the requested output quantity')).toBeVisible();
  // await expect(page.getByTestId('output-quantity')).toHaveText('1');

  // 4) Verificar que o estoque do produto foi atualizad
  // await page.getByRole('link', { name: 'Produtos', exact: true }).click();
  // await page.waitForTimeout(2000);
  // await page.getByRole('link', { name: 'Detalhes' }).filter({ has: page.locator(`xpath=ancestor::tr[contains(., "${barcode}")]`) }).first().click();
  // await page.waitForTimeout(2000);

  // O estoque deve ser 14 agora (era 100, saida de 86)
  // await expect(page.getByTestId('product-quantity')).toHaveText('14');

});
