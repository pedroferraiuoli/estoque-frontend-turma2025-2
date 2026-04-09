import { Given, When, Then } from '@cucumber/cucumber'
import { CustomWorld } from '../support/world.ts'
import { expect } from '@playwright/test';

const barcode: number = Date.now();
const productName = 'Chocolate2' + barcode.toString();
let orderUuid: string = '';

Given('que criei um produto, uma entrada e um pedido para saida erro', { timeout: 30000 }, async function (this: CustomWorld) {
  // Criar produto
  await this.page!.goto('/');
  await this.page!.getByRole('link', { name: 'Produtos', exact: true }).click();
  await this.page!.getByRole('link', { name: 'Novo Produto' }).click();
  await this.page!.waitForTimeout(500);
  await this.page!.getByRole('textbox', { name: 'Código de Barras' }).fill(barcode.toString());
  await this.page!.getByRole('textbox', { name: 'Nome' }).fill(productName);
  await this.page!.getByRole('spinbutton', { name: 'Dias de Referência' }).fill('30');
  await this.page!.getByRole('button', { name: 'Criar Produto' }).click();
  await this.page!.waitForTimeout(2000);
  await expect(this.page!.getByText('Produto criado com sucesso!')).toBeVisible();

  // Criar pedido
  await this.page!.getByRole('link', { name: 'Pedidos', exact: true }).click();
  await this.page!.waitForTimeout(1000);
  await this.page!.getByRole('link', { name: 'Novo Pedido' }).click();
  await this.page!.waitForTimeout(1000);
  await this.page!.getByRole('textbox', { name: 'Código de Barras do Produto' }).fill(barcode.toString());
  await this.page!.getByRole('spinbutton', { name: 'Quantidade' }).fill('10');
  await this.page!.locator('#orderDate').fill('2025-07-10T10:00');
  await this.page!.getByRole('button', { name: 'Criar Pedido' }).click();
  await this.page!.waitForTimeout(2000);

  // Capturar UUID do pedido
  orderUuid = await this.page!.locator('.detail-item strong').first().innerText();

  // Criar entrada
  await this.page!.getByRole('link', { name: 'Entradas', exact: true }).click();
  await this.page!.waitForTimeout(1000);
  await this.page!.getByRole('link', { name: 'Nova Entrada' }).click();
  await this.page!.waitForTimeout(1000);

  await this.page!.getByRole('textbox', { name: 'UUID do Pedido' }).fill(orderUuid);
  await this.page!.getByRole('spinbutton', { name: 'Quantidade' }).fill('100');
  await this.page!.locator('#inputDate').fill('2025-07-15T10:00');

  await this.page!.getByRole('button', { name: 'Criar Entrada' }).click();
  await this.page!.waitForTimeout(2000);
})

When('navego para a tela de nova saida erro', async function (this: CustomWorld) {
  await this.page!.getByRole('link', { name: 'Saídas', exact: true }).click();
  await this.page!.waitForTimeout(1000);
  await this.page!.getByRole('link', { name: 'Nova Saida' }).click();
  await this.page!.waitForTimeout(1000);
})

When('preencho os dados da saida com o barcode do produto e a quantidade maior que o estoque', async function (this: CustomWorld) {
  await this.page!.getByRole('textbox', { name: 'Código de Barras do Produto' }).fill(barcode.toString());
  await this.page!.getByRole('spinbutton', { name: 'Quantidade' }).fill('110');
  await this.page!.locator('#outputDate').fill('2025-07-15T10:00');
})

When('solicito a criação da saida erro', async function (this: CustomWorld) {
  await this.page!.getByRole('button', { name: 'Criar Saída' }).click();
  await this.page!.waitForTimeout(2000);
})

Then('devo ver a mensagem de erro que a saida é maior que o estoque', { timeout: 15000 }, async function (this: CustomWorld) {
  await expect(this.page!.getByText('Insufficient stock for the requested output quantity')).toBeVisible();
})
