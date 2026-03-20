import { test, expect } from '@playwright/test';

test('Deve cadastrar um novo produto', async ({ page }) => {

  const barcode: number = Date.now();

  await page.goto('/');
  await page.getByRole('link', { name: 'Produtos', exact: true }).click();
  await page.getByRole('link', { name: 'Novo Produto' }).click();
  await page.waitForTimeout(500);
  await page.getByRole('textbox', { name: 'Código de Barras' }).fill(barcode.toString());
  await page.getByRole('textbox', { name: 'Nome' }).fill('Guaraná' + barcode.toString());
  await page.getByRole('spinbutton', { name: 'Dias de Referência' }).fill('30');
  await page.getByRole('button', { name: 'Criar Produto' }).click();
  await page.waitForTimeout(2000);
  await expect(page.getByText('Produto criado com sucesso!')).toBeVisible();
  await expect(page).toHaveURL('/products/' + barcode.toString());
  await expect(page.getByTestId('product-barcode')).toHaveText(barcode.toString());
  await expect(page.getByTestId('product-name')).toHaveText('Guaraná' + barcode.toString());
  await expect(page.getByTestId('product-quantity')).toHaveText('0');
  await expect(page.getByTestId('product-reference-days')).toHaveText('30');
  await page.waitForTimeout(4000);
  await page.goto('/products');
  await page.waitForTimeout(4000);
  await expect(page.getByText(barcode.toString(), { exact: true })).toBeVisible();
});

test('Deve retornar erro quando o barcode estiver em branco', async ({ page }) => {

  const barcode: number = Date.now();

  await page.goto('/');
  await page.getByRole('link', { name: 'Produtos', exact: true }).click();
  await page.getByRole('link', { name: 'Novo Produto' }).click();
  await page.waitForTimeout(500);
  await page.getByRole('textbox', { name: 'Nome' }).fill('Guaraná' + barcode.toString());
  await page.getByRole('spinbutton', { name: 'Dias de Referência' }).fill('30');
  await page.getByRole('button', { name: 'Criar Produto' }).click();
  await expect(page.getByText('Barcode cannot be empty')).toBeVisible();
});
