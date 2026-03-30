import { Given, When, Then } from '@cucumber/cucumber'
import { CustomWorld } from '../support/world.ts'
import { expect } from '@playwright/test';

const barcode: number = Date.now();
let uuid: string = '';

Given('que estou na tela de criacao de pedido', async function (this: CustomWorld) {
  await this.page!.goto('/');
  await this.page!.waitForTimeout(2000);
  await this.page!.getByRole('link', { name: 'Pedidos', exact: true }).click();
  await this.page!.waitForTimeout(2000);
  await this.page!.getByRole('link', { name: 'Novo Pedido' }).click();
  await this.page!.waitForTimeout(2000);
})

When('preencho os dados do pedido', async function (this: CustomWorld) {
  await this.page!.getByRole('textbox', { name: 'Código de Barras do Produto' }).fill(barcode.toString());
  await this.page!.waitForTimeout(1000);
  await this.page!.getByRole('spinbutton', { name: 'Quantidade' }).fill("10");
  await this.page!.waitForTimeout(1000);
  await this.page!.locator('#orderDate').fill('2025-07-10T10:00');
  await this.page!.waitForTimeout(1000);
})

When('solicito a criacao do pedido', async function (this: CustomWorld) {
  await this.page!.getByRole('button', { name: 'Criar Pedido' }).click();
  await this.page!.waitForTimeout(1000);
})

Then('devo ver os dados do pedido cadastrado com status = opened', async function (this: CustomWorld) {
  await this.page!.waitForURL(/\/orders\/[^/]+$/);  // Espera que a URL seja '/orders/uuid'
  uuid = this.page!.url().split('/orders/')[1]?.split('?')[0];   // Salva o uuid pra usar dps
  await expect(uuid).toBeTruthy();  // Espera que o uuid seja definido
  await expect(this.page!.getByTestId('order-uuid')).toContainText(uuid);
  await expect(this.page!.getByTestId('order-product')).toContainText('Guaraná' + barcode.toString());
  await expect(this.page!.getByTestId('order-barcode')).toContainText(barcode.toString());
  await expect(this.page!.getByTestId('order-quantity')).toContainText('10');
  await expect(this.page!.getByTestId('order-date')).toContainText('10/07/2025, 10:00:00');  // Input date modifica formato, então não da pra procurar '2025-07-10T10:00'
  await expect(this.page!.getByTestId('order-status')).toContainText('opened');
})

Then('devo ver o pedido na lista de pedidos de produtos', async function (this: CustomWorld) {
  await this.page!.getByRole('link', { name: 'Voltar para Pedidos' }).click();
  await this.page!.waitForTimeout(2000);
  await expect(this.page!.getByText(uuid, { exact: true })).toBeVisible(); //Verifica se o uuid consta na tabela
})