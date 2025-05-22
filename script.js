// Configurações das receitas de chocolate
const chocolateRecipes = {
    // Chocolate 70%
    "70": {
        liquor: 0.65, // 65% de liquor
        sugar: 0.30,  // 30% de açúcar
        butter: 0.04, // 4% de manteiga de cacau
        milk: 0,      // 0% de leite em pó
        lecithin: 0.01 // 1% de lecitina de soja
    },
    // Chocolate 40%
    "40": {
        liquor: 0.35, // 35% de liquor
        sugar: 0.40,  // 40% de açúcar
        butter: 0.15, // 15% de manteiga de cacau
        milk: 0.09,   // 9% de leite em pó
        lecithin: 0.01 // 1% de lecitina de soja
    },
    // Chocolate Meio ao Leite
    {
    "meio-leite": {
        liquor: 0.30, // 30% de liquor
        sugar: 0.35,  // 35% de açúcar
        butter: 0.13, // 13% de manteiga de cacau
        milk: 0.14,   // 14% de leite em pó
        lecithin: 0.004 // 0.4% de lecitina de soja
    }
}
};

// Elementos do DOM
const chocolateTypeSelect = document.getElementById('chocolate-type');
const referenceTypeSelect = document.getElementById('reference-type');
const referenceValueInput = document.getElementById('reference-value');
const calculateButton = document.getElementById('calculate-btn');
const liquorValue = document.getElementById('liquor-value');
const sugarValue = document.getElementById('sugar-value');
const butterValue = document.getElementById('butter-value');
const milkValue = document.getElementById('milk-value');
const lecithinValue = document.getElementById('lecithin-value');
const totalValue = document.getElementById('total-value');

// Função para calcular a receita
function calculateRecipe() {
    // Obter valores dos inputs
    const chocolateType = chocolateTypeSelect.value;
    const referenceType = referenceTypeSelect.value;
    const referenceValue = parseFloat(referenceValueInput.value);
    
    // Verificar se o valor de referência é válido
    if (isNaN(referenceValue) || referenceValue <= 0) {
        alert('Por favor, insira um valor de referência válido.');
        return;
    }
    
    // Obter a receita do tipo de chocolate selecionado
    const recipe = chocolateRecipes[chocolateType];
    
    // Calcular os valores com base no tipo de referência
    let totalWeight, liquorWeight, sugarWeight, butterWeight, milkWeight, lecithinWeight;
    
    switch (referenceType) {
        case 'total':
            // Referência: Peso Total Final
            totalWeight = referenceValue;
            liquorWeight = totalWeight * recipe.liquor;
            sugarWeight = totalWeight * recipe.sugar;
            butterWeight = totalWeight * recipe.butter;
            milkWeight = totalWeight * recipe.milk;
            lecithinWeight = totalWeight * recipe.lecithin;
            break;
            
        case 'liquor':
            // Referência: Peso de Liquor
            liquorWeight = referenceValue;
            totalWeight = liquorWeight / recipe.liquor;
            sugarWeight = totalWeight * recipe.sugar;
            butterWeight = totalWeight * recipe.butter;
            milkWeight = totalWeight * recipe.milk;
            lecithinWeight = totalWeight * recipe.lecithin;
            break;
            
        case 'sugar':
            // Referência: Peso de Açúcar
            sugarWeight = referenceValue;
            totalWeight = sugarWeight / recipe.sugar;
            liquorWeight = totalWeight * recipe.liquor;
            butterWeight = totalWeight * recipe.butter;
            milkWeight = totalWeight * recipe.milk;
            lecithinWeight = totalWeight * recipe.lecithin;
            break;
    }
    
    // Atualizar os valores na interface
    liquorValue.textContent = `${Math.round(liquorWeight)}g`;
    sugarValue.textContent = `${Math.round(sugarWeight)}g`;
    butterValue.textContent = `${Math.round(butterWeight)}g`;
    milkValue.textContent = `${Math.round(milkWeight)}g`;
    lecithinValue.textContent = `${Math.round(lecithinWeight)}g`;
    totalValue.textContent = `${Math.round(totalWeight)}g`;
    
    // Mostrar a seção de resultados com uma animação suave
    document.getElementById('results').style.display = 'block';
    document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
}

// Adicionar evento de clique ao botão de calcular
calculateButton.addEventListener('click', calculateRecipe);

// Adicionar evento de tecla Enter no campo de valor de referência
referenceValueInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        calculateRecipe();
    }
});

// Inicializar a calculadora
document.addEventListener('DOMContentLoaded', function() {
    // Esconder a seção de resultados inicialmente
    document.getElementById('results').style.display = 'none';
});
