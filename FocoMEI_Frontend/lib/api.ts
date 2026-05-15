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