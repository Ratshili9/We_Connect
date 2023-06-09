// Copyright 2023 Tiffani_Jackonia
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function handleChatFormError(msg, display){
    var myErrorDiv = document.getElementById("chat-create-form-error")
    if (display === true) {
        // show error
        myErrorDiv.setAttribute("class", "d-block alert alert-danger")
        myErrorDiv.innerText = msg
    } else {
        // hide error
        myErrorDiv.setAttribute("class", "d-none alert alert-danger")
    }
}

function handleChatCreateFormDidSumbit(event) {
    event.preventDefault()
    const myForm = event.target
    const myFormData = new FormData(myForm)
    const url = myForm.getAttribute("action")
    const method = myForm.getAttribute("method")
    const xhr = new XMLHttpRequest()
    const responseType = "json"
    xhr.responseType = responseType
    xhr.open(method, url)
    xhr.setRequestHeader("HTTP_X_REQUESTED_WITH", "XMLHttpRequest")
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest")
    xhr.onload = function() {
        if (xhr.status === 201) {
            handleChatFormError("", false)
            const newChatJson = xhr.response
            const newChatElement = formatChatElement(newChatJson)
            const ogHtml = chatsContainerElement.innerHTML
            chatsContainerElement.innerHTML = newTweetElement + ogHtml
            myForm.reset()
        } else if (xhr.status === 400) {
            const errorJson = xhr.response
            const contentError = errorJson.content
            let contentErrorMsg;
            if (contentError) {
                contentErrorMsg = contentError[0]
                if (contentErrorMsg) {
                    handleChatFormError(contentErrorMsg, true)
                } else {
                    alert("An error occured. Please try again.")
                }
            } else {
                alert("An error occured. Please try again.")
            }   
        } else if (xhr.status === 401) {
            alert("You must login!")
            window.location.href = "/login"
        } else if (xhr.status === 403) {
            alert("You must login!")
            window.location.href = "/login"
        }
        else if (xhr.status === 500) {
            alert("There was a server error, please try again.")
        }
        
    }
    xhr.onerror = function() {
        alert("An error occurred. Please try again later.")
    }
    xhr.send(myFormData)
}

const chatCreateFormEl = document.getElementById("chat-create-form")
chatCreateFormEl.addEventListener("submit", handleChatCreateFormDidSumbit)

const chatsContainerElement = document.getElementById("chats")

function loadChats(chatsElement) {
    const xhr = new XMLHttpRequest()
    const method = 'GET' // "POST"
    const url = "/chats"
    const responseType = "json"
    xhr.responseType = responseType
    xhr.open(method, url)
    xhr.onload = function() {
        const serverResponse = xhr.response
        const listedItems = serverResponse // array
        var finalChatStr = ""
        var i;
        for (i=0;i<listedItems.length; i++) {
            var chatObj = listedItems[i]
            var currentItem = formatChatElement(chatObj)
            finalChatStr += currentItem
        }
        chatsElement.innerHTML = finalChatStr
    }
    xhr.send()
}

loadChats(ChatsContainerElement)

