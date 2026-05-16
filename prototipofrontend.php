<?php
// Roteamento simples para o protótipo
$page = $_GET['page'] ?? 'estoque';

// Dados simulados baseados no AppDbContext.cs
$produtos = [
    ['id' => 1, 'description' => 'Empadinha Tropical', 'value' => 10.00],
    ['id' => 2, 'description' => 'Coxinha Vegana de Jaca', 'value' => 7.00]
];

$usuarios = [
    ['id' => 1, 'name' => 'Ivone']
];
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FocoMEI - Protótipo</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        /* Fundo leve para simular a tela do celular */
        body { background-color: #F8F9FA; }
        .app-container { max-width: 400px; margin: 0 auto; background: white; min-height: 100vh; position: relative; box-shadow: 0 0 15px rgba(0,0,0,0.1); }
    </style>
</head>
<body class="text-gray-800 antialiased">

<div class="app-container pb-24">
    <header class="bg-emerald-600 text-white p-4 shadow-md flex justify-between items-center sticky top-0 z-10">
        <div class="font-bold text-lg">FocoMEI</div>
        <nav class="space-x-3 text-sm">
            <a href="?page=estoque" class="<?= $page == 'estoque' ? 'underline font-bold' : 'opacity-80' ?>">Estoque</a>
            <a href="?page=pdv" class="<?= $page == 'pdv' ? 'underline font-bold' : 'opacity-80' ?>">Nova Venda</a>
        </nav>
    </header>

    <main class="p-4">
        
        <?php if ($page === 'estoque'): ?>
            <h2 class="text-xl font-bold mb-4 text-gray-700">Seus Produtos</h2>
            
            <input type="text" placeholder="Buscar produto..." class="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500">

            <div class="space-y-3">
                <?php foreach ($produtos as $produto): ?>
                <div class="p-4 border border-gray-200 rounded-xl shadow-sm flex justify-between items-center bg-gray-50">
                    <span class="font-medium text-gray-700"><?= $produto['description'] ?></span>
                    <span class="font-bold text-emerald-600">R$ <?= number_format($produto['value'], 2, ',', '.') ?></span>
                </div>
                <?php endforeach; ?>
            </div>

            <a href="?page=novo_produto" class="fixed bottom-6 right-6 lg:absolute lg:bottom-6 lg:right-6 bg-emerald-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg text-2xl hover:bg-emerald-700 transition">
                +
            </a>

        <?php elseif ($page === 'novo_produto'): ?>
            <div class="flex items-center mb-6">
                <a href="?page=estoque" class="text-emerald-600 mr-3 text-2xl font-bold">&larr;</a>
                <h2 class="text-xl font-bold text-gray-700">Cadastrar Produto</h2>
            </div>

            <form action="?page=estoque" method="POST" class="space-y-5">
                <div>
                    <label class="block text-sm font-bold text-gray-600 mb-1">Descrição do Produto</label>
                    <input type="text" placeholder="Ex: Suco Natural 500ml" required class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500">
                </div>
                
                <div>
                    <label class="block text-sm font-bold text-gray-600 mb-1">Valor de Venda (R$)</label>
                    <input type="number" step="0.01" placeholder="0,00" required class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500">
                </div>

                <button type="submit" class="w-full bg-emerald-600 text-white font-bold p-4 rounded-xl mt-4 hover:bg-emerald-700 transition shadow-md">
                    Salvar Produto
                </button>
            </form>

        <?php elseif ($page === 'pdv'): ?>
            <h2 class="text-xl font-bold mb-4 text-gray-700">Frente de Caixa</h2>

            <div class="mb-6">
                <label class="block text-sm font-bold text-gray-600 mb-2">1. Selecione o Cliente</label>
                <select class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white">
                    <?php foreach ($usuarios as $user): ?>
                        <option value="<?= $user['id'] ?>"><?= $user['name'] ?></option>
                    <?php endforeach; ?>
                </select>
            </div>

            <label class="block text-sm font-bold text-gray-600 mb-2">2. Adicionar Itens</label>
            <div class="grid grid-cols-2 gap-3 mb-8">
                <?php foreach ($produtos as $produto): ?>
                <button class="p-3 border border-emerald-200 bg-emerald-50 rounded-xl text-left hover:bg-emerald-100 transition flex flex-col justify-between h-24">
                    <span class="text-sm font-medium text-gray-800"><?= $produto['description'] ?></span>
                    <span class="text-emerald-700 font-bold">+ R$ <?= number_format($produto['value'], 2, ',', '.') ?></span>
                </button>
                <?php endforeach; ?>
            </div>

            <div class="absolute bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] rounded-t-2xl">
                <div class="flex justify-between items-center mb-4">
                    <span class="text-gray-600 font-bold">Total da Venda:</span>
                    <span class="text-2xl font-bold text-emerald-600">R$ 24,00</span>
                </div>
                <button class="w-full bg-emerald-600 text-white font-bold p-4 rounded-xl hover:bg-emerald-700 transition shadow-md">
                    Finalizar Venda
                </button>
            </div>

        <?php endif; ?>

    </main>
</div>

</body>
</html>