import { Given, When, Then } from '@cucumber/cucumber'
import { CustomWorld } from '../support/world.ts'
import { expect } from '@playwright/test';

When('preencho os dados do pedido fornecendo um produto inexistente', async function (this: CustomWorld) {
  await this.page!.getByRole('textbox', { name: 'Código de Barras do Produto' }).fill('lalala123');
  await this.page!.waitForTimeout(1000);
  await this.page!.getByRole('spinbutton', { name: 'Quantidade' }).fill("10");
  await this.page!.waitForTimeout(1000);
  await this.page!.locator('#orderDate').fill('2025-07-10T10:00');
  await this.page!.waitForTimeout(1000);
})

Then('devo ver uma mensagem de erro por produto inexistente', async function (this: CustomWorld) {
  await expect(this.page!).toHaveURL('/orders/new');
  await expect(this.page!.locator('.toast.toast-error')).toContainText('Product not found');
})