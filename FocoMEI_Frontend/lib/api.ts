const API_URL = "http://localhost:5086"

export async function getProducts() {
  const response = await fetch(`${API_URL}/api/Product`)

  if (!response.ok) {
    throw new Error("Erro ao buscar produtos")
  }

  return response.json()
}

export async function getSales() {
  const response = await fetch(`${API_URL}/api/Sale`)

  if (!response.ok) {
    throw new Error("Erro ao buscar vendas")
  }

  return response.json()
}

export async function createSale(saleData: { userId: number; total: number; productId: number; quantidade: number }) {
  const response = await fetch(`${API_URL}/api/sale/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(saleData),
  })

  if (!response.ok) {
    throw new Error("Erro ao criar venda")
  }

  return response.json()
}

export async function getSalesByUserId(userId: number) {
  const response = await fetch(`${API_URL}/api/sale/byUser/${userId}`)

  if (!response.ok) {
    throw new Error("Erro ao buscar vendas do usuário")
  }

  return response.json()
}

export async function createProduct(productData: { description: string; value: number }) {
  const response = await fetch(`${API_URL}/api/Product`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  })

  if (!response.ok) {
    throw new Error("Erro ao criar produto")
  }

  return response.json()
}