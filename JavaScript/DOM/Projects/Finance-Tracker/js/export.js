// export.js

const exportButton = document.querySelector("#exportCSV");
const exportPDFButton = document.querySelector("#exportPDF");

function initializeExport(){
    if(exportButton){
        exportButton.addEventListener(
            "click",
            exportTransactions
        );
    }
    if(exportPDFButton){
        exportPDFButton.addEventListener(
            "click",
            exportPDF
        );
    }
}

function exportTransactions(){
    let csv = "Date,Description,Category,Type,Amount\n";
    appState.transactions.forEach(function(transaction){
        csv += `"${formatDate(transaction.date)}","${transaction.description}","${transaction.category}","${transaction.type}","${transaction.amount}"\n`;
    });
    // const blob = downloadFile(
    // blob,
    // "transactions.csv"
    // );
    // const url = URL.createObjectURL(blob);
    // const link = document.createElement("a");
    // link.href = url;
    // link.download = "transactions.csv";
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
    // URL.revokeObjectURL(url);

    const blob = new Blob([csv],{type:"text/csv;charset=utf-8;"});

    downloadFile(blob,"transactions.csv");

    showToast("CSV exported successfully","success");
}

function calculateSummary(){
    let income = 0;
    let expense = 0;
    appState.transactions.forEach(function(transaction){
        if(transaction.type === TRANSACTION_TYPES.INCOME){
            income += transaction.amount;
        }
        else{
            expense += transaction.amount;
        }
    });
    return{
        income,
        expense,
        balance:income-expense,
        transactions:appState.transactions.length
    };
}

function exportPDF(){

    const { jsPDF } = window.jspdf;

    const pdf = new jsPDF({
        orientation:"portrait",
        unit:"mm",
        format:"a4"
    });

    pdf.setFont("helvetica","bold");
    pdf.setFontSize(24);

    pdf.text(
        "FinTrack Pro",
        105,
        20,
        {
            align:"center"
        }
    );

    pdf.setFont("helvetica","normal");
    pdf.setFontSize(13);

    pdf.text(
        "Financial Report",
        105,
        30,
        {
            align:"center"
        }
    );

    const reportDate =
        new Date().toLocaleDateString(
            "en-IN",
            {
                day:"2-digit",
                month:"long",
                year:"numeric"
            }
        );

    pdf.setFontSize(10);

    pdf.text(
        `Generated on: ${reportDate}`,
        14,
        40
    );

    pdf.setDrawColor(220);

    pdf.line(
        14,
        45,
        196,
        45
    );

    const summary = calculateSummary();

    pdf.setFontSize(16);

    pdf.setFont(
        "helvetica",
        "bold"
    );

    pdf.text(
        "Financial Summary",
        14,
        58
    );

    pdf.setDrawColor(220);

    pdf.roundedRect(
        14,
        64,
        182,
        38,
        3,
        3
    );

    pdf.setFontSize(11);

    pdf.setFont(
        "helvetica",
        "bold"
    );

    pdf.text(
        "Current Balance",
        20,
        76
    );

    pdf.setFont(
        "helvetica",
        "normal"
    );

    pdf.text(
        "Rs. " + summary.balance.toLocaleString("en-IN",{minimumFractionDigits:2}),
        20,
        84
    );

    pdf.setFont(
    "helvetica",
    "bold"
    );

    pdf.text(
        "Total Income",
        75,
        76
    );

    pdf.setFont(
        "helvetica",
        "normal"
    );

    pdf.text(
        "Rs." + summary.income.toLocaleString("en-IN",{minimumFractionDigits:2}),
        75,
        84
    );

    pdf.setFont(
    "helvetica",
    "bold"
    );

    pdf.text(
        "Total Expense",
        130,
        76
    );

    pdf.setFont(
        "helvetica",
        "normal"
    );

    pdf.text(
        "Rs." + summary.expense.toLocaleString("en-IN",{minimumFractionDigits:2}),
        130,
        84
    );

    pdf.setFont(
        "helvetica",
        "bold"
    );

    pdf.text(
        UI_TEXT.TRANSACTIONS,
        20,
        96
    );

    pdf.setFont(
        "helvetica",
        "normal"
    );

    pdf.text(
        String(summary.transactions),
        55,
        96
    );

    const tableData = appState.transactions.map(function(transaction){
        return[
    formatDate(transaction.date),

    transaction.description,

    transaction.category,

    transaction.type,

    formatCurrency(transaction.amount)
        ];
    });

    pdf.setFontSize(16);

    pdf.setFont(
        "helvetica",
        "bold"
    );

    pdf.text(
        "Transaction History",
        14,
        108
    );

    pdf.autoTable({
    startY:115,
    head:[
        [
            "Date",
            "Description",
            "Category",
            "Type",
            "Amount"
        ]
    ],
    body: tableData,
    didParseCell: function(data){
        if(data.section === "body"){
        const type = data.row.raw[3];
        if(type === TRANSACTION_TYPES.INCOME){
            data.cell.styles.textColor = [22,163,74];
            data.cell.styles.fontStyle = "bold";
        }
        if(type === TRANSACTION_TYPES.EXPENSE){
        data.cell.styles.textColor = [220,38,38];
        data.cell.styles.fontStyle = "bold";
            }
        }
    },
    theme:"grid",
    headStyles:{
        fillColor:[37,99,235],
        textColor:[255,255,255],
        minCellHeight:12,
        fontSize:11,
        fontStyle:"bold",
        halign:"center",
        valign:"middle"
    },
    bodyStyles:{
        fontSize:10
    },
    alternateRowStyles:{
        fillColor:[245,247,250]
    },
    styles:{
        cellPadding:4,
        fontSize:10,
        overflow:"linebreak",
        valign:"middle",
        lineColor:[225,229,235],
        lineWidth:.2
    },
    columnStyles:{
        0:{cellWidth:28},
        1:{cellWidth:55},
        2:{cellWidth:38},
        3:{cellWidth:28},
        4:{
            cellWidth:35,
            halign:"right"
        }
    }

});

    incomeExpenseChart.update();
    categoryChart.update();
    monthlyChart.update();

    const incomeChartImage = incomeExpenseChart.toBase64Image();

    const categoryChartImage = categoryChart.toBase64Image();

    const monthlyChartImage = monthlyChart.toBase64Image();

    // let currentY = pdf.lastAutoTable.finalY + 15;

    // if(currentY > 180){
    // pdf.addPage();
    // currentY = 20;
    // }

    pdf.addPage();

    let currentY = 20;

    pdf.setFontSize(16);

    pdf.setFont(
    "helvetica",
    "bold"
    );

    pdf.text(
        "Financial Charts",
        14,
        currentY
    );

    currentY += 10;

    pdf.setFontSize(12);

    pdf.setFont(
        "helvetica",
        "bold"
    );

    pdf.text(
        "Income vs Expense",
        28,
        currentY
    );

    pdf.text(
        "Category Breakdown",
        118,
        currentY
    );

currentY += 6;

    pdf.addImage(
    incomeChartImage,
    "PNG",
    18,
    currentY,
    70,
    70
    );

    pdf.addImage(
    categoryChartImage,
    "PNG",
    110,
    currentY,
    70,
    70
    );

    currentY += 82;

    pdf.setFontSize(12);

    pdf.text(
        "Monthly Income vs Expense",
        15,
        currentY
    );

    currentY += 6;

    if(currentY + 75 > 280){

        pdf.addPage();

        currentY = 20;

    }

    pdf.addImage(
        monthlyChartImage,
        "PNG",
        15,
        currentY,
        180,
        50
    );

    const pageCount = pdf.internal.getNumberOfPages();

    for(let i=1;i<=pageCount;i++){

    pdf.setPage(i);

    pdf.setFontSize(9);

    pdf.setTextColor(120);

    pdf.text(

    "Generated by FinTrack Pro",

    14,

    285

);

    pdf.text(
        `Page ${i} of ${pageCount}`,
        196,
        285,
        {
            align:"right"
        }
    );

}

    pdf.save("FinTrack_Report.pdf");

    showToast(
        "PDF exported successfully",
        "success"
    );
}
