/* utils/format.js */

function formatCurrency(amount){

    return new Intl.NumberFormat(

        "en-IN",

        {

            style:"currency",

            currency:appState.settings.currency

        }

    ).format(amount);

}

function formatDate(date){

    const selectedFormat =
        appState.settings.dateFormat;

    const formattedDate =
        new Date(date);

    if(selectedFormat === "DD/MM/YYYY"){

        return formattedDate.toLocaleDateString(
            "en-GB"
        );

    }

    if(selectedFormat === "MM/DD/YYYY"){

        return formattedDate.toLocaleDateString(
            "en-US"
        );

    }

    return formattedDate
        .toISOString()
        .split("T")[0];

}

function formatPercentage(value){

    return `${Number(value).toFixed(0)}%`;

}

function formatNumber(number){

    return new Intl.NumberFormat(
        "en-IN"
    ).format(number);

}

function formatMonth(date){

    return new Date(date).toLocaleString(
        "default",
        {
            month:"short"
        }
    );

}

function formatFullDate(date){

    return new Date(date).toLocaleDateString(
        "en-IN",
        {
            day:"2-digit",
            month:"long",
            year:"numeric"
        }
    );

}