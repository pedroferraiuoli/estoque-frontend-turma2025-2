import { Given, When, Then } from '@cucumber/cucumber'
import { CustomWorld } from '../support/world.ts'
import { expect } from '@playwright/test';

const barcode: number = Date.now();

Given('que estou na tela de cadastro', async function (this: CustomWorld) {
    await this.page!.goto('/');
    await this.page!.getByRole('link', { name: 'Produtos', exact: true }).click();
    await this.page!.getByRole('link', { name: 'Novo Produto' }).click();
    await this.page!.waitForTimeout(500);
})

When('preencho os dados do produto', async function (this: CustomWorld) {
  await this.page!.getByRole('textbox', { name: 'Código de Barras' }).fill(barcode.toString());
  await this.page!.getByRole('textbox', { name: 'Nome' }).fill('Guaraná' + barcode.toString());
  await this.page!.getByRole('spinbutton', { name: 'Dias de Referência' }).fill('30');
})

When('solicito o cadastro', async function (this: CustomWorld) {
  await this.page!.getByRole('button', { name: 'Criar Produto' }).click();
  await this.page!.waitForTimeout(2000);
})

Then('devo ver os dados do produto cadastrado com estoque = 0', async function (this: CustomWorld) {
  await expect(this.page!.getByText('Produto criado com sucesso!')).toBeVisible();
  await expect(this.page!).toHaveURL('/products/' + barcode.toString());
  await expect(this.page!.getByTestId('product-barcode')).toHaveText(barcode.toString());
  await expect(this.page!.getByTestId('product-name')).toHaveText('Guaraná' + barcode.toString());
  await expect(this.page!.getByTestId('product-quantity')).toHaveText('0');
  await expect(this.page!.getByTestId('product-reference-days')).toHaveText('30');
  await this.page!.waitForTimeout(4000);
})

Then('devo ver o produto na lista de produtos', async function (this: CustomWorld) {
  await this.page!.goto('/products');
  await this.page!.waitForTimeout(4000);
  await expect(this.page!.getByText(barcode.toString(), { exact: true })).toBeVisible();
})