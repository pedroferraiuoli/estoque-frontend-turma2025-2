import { test, expect } from '@playwright/test';

test('Deve cadastrar um novo pedido', async ({ page }) => {

  const barcode: number = Date.now();

  await page.goto('/');
  await page.getByRole('link', { name: 'Produtos', exact: true }).click();
  await page.getByRole('link', { name: 'Novo Produto' }).click();
  await page.waitForTimeout(500);
  await page.getByRole('textbox', { name: 'Código de Barras' }).fill(barcode.toString());
  await page.getByRole('textbox', { name: 'Nome' }).fill('Guaraná' + barcode.toString());
  await page.getByRole('spinbutton', { name: 'Dias de Referência' }).fill('30');
    await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Criar Produto' }).click();
  await page.waitForTimeout(2000);
  await page.getByRole('link', { name: 'Pedidos', exact: true }).click();
  await page.waitForTimeout(2000);
  await page.getByRole('link', { name: 'Novo Pedido' }).click();
  await page.waitForTimeout(2000);
  await page.getByRole('textbox', { name: 'Código de Barras do Produto' }).fill(barcode.toString());
  await page.waitForTimeout(2000);
  await page.getByRole('spinbutton', { name: 'Quantidade' }).fill("10");
  await page.waitForTimeout(2000);
  await page.locator('#orderDate').fill('2025-07-10T10:00');
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Criar Pedido' }).click();
  await page.waitForTimeout(2000);
  await page.getByRole('link', { name: 'Voltar para Pedidos' }).click();
  await page.waitForTimeout(2000);
});

test('Deve retornar erro ao criar pedido com quantidade negativa', async ({ page }) => {
  await page.goto('/');
  await page.waitForTimeout(2000);
  await page.getByRole('link', { name: 'Pedidos', exact: true }).click();
  await page.waitForTimeout(2000);
  await page.getByRole('link', { name: 'Novo Pedido' }).click();
  await page.waitForTimeout(2000);
  await page.getByRole('textbox', { name: 'Código de Barras do Produto' }).fill('lalala123');
  await page.waitForTimeout(2000);
  await page.getByRole('spinbutton', { name: 'Quantidade' }).fill('10');
  await page.waitForTimeout(2000);
  await page.locator('#orderDate').fill('2025-07-10T10:00');
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Criar Pedido' }).click();
  await page.waitForTimeout(2000);
  await expect(page).toHaveURL('/orders/new');
  await expect(page.locator('.toast.toast-error')).toContainText('Product not found');
});