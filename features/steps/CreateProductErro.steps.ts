import { Given, When, Then } from '@cucumber/cucumber'
import { CustomWorld } from '../support/world.ts'
import { expect } from '@playwright/test';

const barcode: number = Date.now();

Given('que estou na tela de cadastro visando o erro', async function (this: CustomWorld) {
    await this.page!.goto('/');
    await this.page!.getByRole('link', { name: 'Produtos', exact: true }).click();
    await this.page!.getByRole('link', { name: 'Novo Produto' }).click();
    await this.page!.waitForTimeout(500);
})

When('preencho os dados do produto sem fornecer o barcode', async function (this: CustomWorld) {
  await this.page!.getByRole('textbox', { name: 'Nome' }).fill('Guaraná' + barcode.toString());
  await this.page!.getByRole('spinbutton', { name: 'Dias de Referência' }).fill('30');
})

When('solicito o cadastro clicando no botao', async function (this: CustomWorld) {
  await this.page!.getByRole('button', { name: 'Criar Produto' }).click();
  await this.page!.waitForTimeout(2000);
})

Then('devo ver uma mensagem de erro', async function (this: CustomWorld) {
  await expect(this.page!.getByText('Barcode cannot be empty')).toBeVisible();
  await this.page!.waitForTimeout(4000);
})