// chart.js
let incomeExpenseChart = null;
let categoryChart = null;
let monthlyChart = null;
let expandedChart = null;

const categoryColors = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#06B6D4",
    "#F97316",
    "#EC4899"
];

const chartElements = {
    incomeExpenseChart: document.querySelector("#incomeExpenseChart"),
    categoryChart: document.querySelector("#categoryChart"),
    monthlyChart: document.querySelector("#monthlyChart"),
};

const chartModalElements = {

    overlay: document.querySelector("#chartModal"),

    canvas: document.querySelector("#expandedChart"),

    title: document.querySelector("#chartModalTitle"),

    closeButton: document.querySelector("#closeChartModal"),

    closeFooterButton: document.querySelector("#closeExpandedChart"),

    downloadButton: document.querySelector("#downloadChart")

};

function initializeMonthlyChart(){
    const context =
        chartElements.monthlyChart.getContext("2d");
    monthlyChart = new Chart(context,{
        type:"line",
        data:{
            labels:[],
            datasets:[
                {
                    label:"Income",
                    data:[],
                    borderColor:"#10B981",
                    backgroundColor:"rgba(16,185,129,.15)",
                    fill:true,
                    tension:.4,
                    borderWidth:3,
                    pointRadius:5,
                    pointHoverRadius:8,
                    pointBackgroundColor:"#10B981",
                    pointBorderColor:"#FFFFFF",
                    pointBorderWidth:2
                },
                {
                    label:"Expense",
                    data:[],
                    borderColor:"#EF4444",
                    backgroundColor:"rgba(239,68,68,.15)",
                    fill:true,
                    tension:.4,
                    borderWidth:3,
                    pointRadius:5,
                    pointHoverRadius:8,
                    pointBackgroundColor:"#EF4444",
                    pointBorderColor:"#FFFFFF",
                    pointBorderWidth:2
                }
            ]
        },
        options:{
            responsive:true,
            maintainAspectRatio:false,
            interaction:{
                mode:"index",
                intersect:false
            },
            plugins:{
                legend:{
                    position:"bottom",
                    labels:{
                        usePointStyle:true,
                        pointStyle:"circle",
                        padding:20,
                        font:{
                            size:14,
                            weight:"600"
                        }
                    }
                }
            },
            scales:{
                x:{
                    grid:{
                        display:false
                    },
                    ticks:{
                        color:"#6B7280"
                    }
                },
                y:{
                    beginAtZero:true,
                    ticks:{
                        callback:function(value){
                            return "₹" + value;
                        }
                    },
                    grid:{
                        color:getComputedStyle(document.body).getPropertyValue("--border")
                    }
                }
            }
        }
    });
}

function initializeCategoryChart() {
    const context = chartElements.categoryChart.getContext("2d");
    categoryChart = new Chart(context, {
        type: "pie",
        data: {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: [],
                radius: "90%",
                hoverOffset: 8,
                borderWidth: 1,
                borderColor: getComputedStyle(document.body)
                    .getPropertyValue("--surface")
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: {
                padding: {
                    top: 10,
                    bottom: 10
                }
            },
            plugins: {
                legend: {
                    position: "bottom",
                    align: "center",
                    labels: {
                        usePointStyle: true,
                        pointStyle: "circle",
                        boxWidth: 18,
                        boxHeight: 18,
                        padding: 30,
                        font: {
                            size: 14,
                            weight: "600"
                        }
                    }
                }
            }
        }
    });
}

function updateChart() {
    if(    !incomeExpenseChart || !categoryChart || !monthlyChart){
        return;
    }

    let income = 0;
    let expense = 0;

    appState.transactions.forEach(transaction => {
        if (transaction.type === TRANSACTION_TYPES.INCOME) {
            income += transaction.amount;
        } else {
            expense += transaction.amount;
        }
    });
    if(income===0 && expense===0){
        incomeExpenseChart.data.datasets[0].data=[1];
        incomeExpenseChart.data.labels=[UI_TEXT.NO_DATA];
        incomeExpenseChart.data.datasets[0].backgroundColor=[
            "#D1D5DB"
        ];
    }else{
        incomeExpenseChart.data.labels=[
            "Income",
            "Expense"
        ];
        incomeExpenseChart.data.datasets[0].backgroundColor=[
            "#10B981",
            "#EF4444"
        ];
        incomeExpenseChart.data.datasets[0].data=[
            income,
            expense
        ];
    }
    incomeExpenseChart.update();
    updateCategoryChart();
    updateMonthlyChart();   
}

function updateCategoryChart(){
    const categoryTotals = {};
    appState.transactions.forEach(function(transaction){
        if(transaction.type === TRANSACTION_TYPES.EXPENSE){
            categoryTotals[transaction.category] = (categoryTotals[transaction.category] || 0) + transaction.amount;
        }
    });
    if(Object.keys(categoryTotals).length === 0){
        categoryChart.data.labels = ["No Expense Data"];
        categoryChart.data.datasets[0].data = [1];
        categoryChart.data.datasets[0].backgroundColor = ["#D1D5DB"];
    }
    else{
        categoryChart.data.labels = Object.keys(categoryTotals);
        categoryChart.data.datasets[0].data = Object.values(categoryTotals);
        categoryChart.data.datasets[0].backgroundColor = categoryColors;
    }
    categoryChart.update();
}

function updateMonthlyChart(){
    if(!monthlyChart){
        return;
    }
    const monthlyData={};
    const today = new Date();
    const labels = [];
    for(let i=11;i>=0;i--){
        const date = new Date(
            today.getFullYear(),
            today.getMonth()-i,
            1
        );
        const label = date.toLocaleString(
            "default",
            {
                month:"short"
            }
        );
        labels.push(label);
        monthlyData[label]={
            income:0,
            expense:0
        };
    }

    appState.transactions.forEach(function(transaction){
        const date = new Date(transaction.date);
        const month = date.toLocaleString(
            "default",
            {
                month:"short"
            }
        );
        if(monthlyData[month]){
            if(transaction.type===TRANSACTION_TYPES.INCOME){
                monthlyData[month].income += transaction.amount;
            }
            else{
                monthlyData[month].expense += transaction.amount;
            }
        }
    });

    monthlyChart.data.labels = labels;
    monthlyChart.data.datasets[0].data = labels.map(label=>monthlyData[label].income);
    monthlyChart.data.datasets[1].data = labels.map(label=>monthlyData[label].expense);
    monthlyChart.update();
}

function openChartModal(){

    chartModalElements.overlay.classList.add("show");

}

function closeChartModal(){

    chartModalElements.overlay.classList.remove("show");

    if(expandedChart){

        expandedChart.destroy();

        expandedChart = null;

    }

}

function renderExpandedChart(chart, type, title){

    console.log("Step 1");

    if(expandedChart){
        expandedChart.destroy();
    }

    console.log("Step 2");

    chartModalElements.title.textContent = title;

    const context =
        chartModalElements.canvas.getContext("2d");

    console.log("Step 3");

    expandedChart = new Chart(context,{

        type:type,

        data: JSON.parse(JSON.stringify(chart.data)),

        options:{
            responsive:true,
            maintainAspectRatio:false
        }

    });

    console.log("Step 4");

    openChartModal();

    console.log("Step 5");

}

function downloadExpandedChart(){

    if(!expandedChart){

        return;

    }

    const link = document.createElement("a");

    link.download =
        "chart.png";

    link.href =
        expandedChart.toBase64Image();

    link.click();

}

function initializeChartEvents(){

    chartElements.incomeExpenseChart
        .addEventListener("click",function(){

        renderExpandedChart(

            incomeExpenseChart,

            "doughnut",

            "Income vs Expense"

        );

    });

    chartElements.categoryChart
        .addEventListener("click",function(){

        renderExpandedChart(

            categoryChart,

            "pie",

            "Expense by Category"

        );

    });

    chartElements.monthlyChart
        .addEventListener("click",function(){

        renderExpandedChart(

            monthlyChart,

            "line",

            "Monthly Overview"

        );

    });

    chartModalElements.closeButton
        .addEventListener(

            "click",

            closeChartModal

        );

    chartModalElements.closeFooterButton
        .addEventListener(

            "click",

            closeChartModal

        );

    chartModalElements.downloadButton
        .addEventListener(

            "click",

            downloadExpandedChart

        );

    chartModalElements.overlay
        .addEventListener(

            "click",

            function(event){

                if(

                    event.target ===

                    chartModalElements.overlay

                ){

                    closeChartModal();

                }

            }

        );

    document.addEventListener(

        "keydown",

        function(event){

            if(

                event.key === "Escape" &&

                chartModalElements.overlay.classList.contains("show")

            ){

                closeChartModal();

            }

        }

    );

}


function initializeChart() {
    if (
        !chartElements.incomeExpenseChart ||
        !chartElements.categoryChart ||
        !chartElements.monthlyChart
    ) {
        return;
    }
    const context = chartElements.incomeExpenseChart.getContext("2d");
    incomeExpenseChart = new Chart(context, {
        type: "doughnut",
        data: {
            labels: [],
            datasets:[
                {
                    data:[0,0],
                    backgroundColor:[
                        "#10B981",
                        "#EF4444"
                    ],
                    radius:"88%",
                    hoverOffset:6,
                    borderWidth:1,
                    borderColor:getComputedStyle(document.body)
                        .getPropertyValue("--surface")
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: {
                padding: {
                    top: 8,
                    bottom: 10
                }
            },
            cutout: "68%",
            animation: {
                duration: 800,
                easing: "easeOutQuart"
            },
            plugins: {
                legend: {
                    position: "bottom",
                    align: "center",
                    labels: {
                        usePointStyle: true,
                        pointStyle: "circle",
                        boxWidth: 18,
                        boxHeight: 18,
                        padding: 10,
                        font: {
                            size: 14,
                            weight: "600"
                        }
                    }
                },
                tooltip: {
                    backgroundColor: "#111827",
                    titleColor: "#FFFFFF",
                    bodyColor: "#FFFFFF",
                    cornerRadius: 12,
                    padding: 12

                }
            }
        }
    });
        initializeCategoryChart();
        initializeMonthlyChart();
        updateChart();
}

