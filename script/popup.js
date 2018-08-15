const queryInfo = {
    active: true,
    windowId: chrome.windows.WINDOW_ID_CURRENT
};

let element = document.querySelector('button');
element.addEventListener('click', function(ev) {
    const value = ev.target.previousElementSibling.value;
    const id_list = value.split('\n');
    const list = removeEmptyStringValueFromArray(id_list);

    console.log(list);

    chrome.tabs.query(queryInfo, function(tabs) {
        chrome.tabs.sendMessage(tabs.shift().id, {
                corporate_number_list: list
            },
            function(response) {
                console.log(response);
            })
    });
});

/**
 * 配列内にある空文字列の要素を削除する
 * @param {string[]} array - 空文字列を含む配列
 * @returns {string[]} list - 空文字列要素を削除した配列
 */
function removeEmptyStringValueFromArray(array) {
    let list = [];

    for (let i = 0, l = array.length; i < l; i++) {
        if (array[i] !== '' ) {
            list.push(array[i]);
        }
    }

    return list;
}

/**
 * ポップアップ内のテキストエリアを更新する
 * @param _list
 */
function updateTextArea(_list) {
    if (_list) {
        const list = removeEmptyStringValueFromArray(_list);
        element = document.querySelector('textarea');
        element.innerText = list.join('\n');
    }
}

// onload 時の処理
chrome.tabs.query(queryInfo, function(tabs) {
    chrome.tabs.sendMessage(tabs.shift().id, {
            on_popup_load: true
        },
        function(response) {
            console.log(response);
            updateTextArea(response);
        })
});
