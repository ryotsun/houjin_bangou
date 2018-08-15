/**
 * 法人番号を埋める
 * @param list
 */
function fillCorporateNumbers(list) {
    let elements = document.querySelectorAll('.multiCnt');
    const len = list.length <= elements.length ? list.length : elements.length;

    for (let i = 0; i < len; i++ ) {
        elements[i].value = list[i];
    }

    if (len < elements.length) {
        for (let i = list.length, l = elements.length; i < l; i++ ) {
            elements[i].value = '';
        }
    }
}

/**
 * 現在の値を取得する
 * @returns {Array}
 */
function getCurrentValues() {
    const elements = document.querySelectorAll('.multiCnt');
    let values = [];

    for (let i = 0, l = elements.length; i < l; i++ ) {
        values.push(elements[i].value);
    }
    return values;
}

chrome.runtime.onMessage.addListener(function (response, sender, sendResponse) {
    if (response) {
        if (response.corporate_number_list) {
            console.log(response);
            fillCorporateNumbers(response.corporate_number_list);
            sendResponse(response);
        } else if (response.on_popup_load) {
            sendResponse(getCurrentValues());
        }
    } else {
        sendResponse('no response');
    }
});

