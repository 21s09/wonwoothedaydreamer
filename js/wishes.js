async function loadWishes() {

    console.log("loadWishes chạy");

    const { data, error } = await supabaseClient
        .from("wishes")
        .select("*")
        .order("created_at", { ascending: false });

    console.log("error:", error);
    console.log("data:", data);

    if (error) {
        console.error(error);
        return;
    }

    // phần code phía dưới giữ nguyên
}

    const wishList = document.getElementById("wishList");

    console.log("wishList:", wishList);

    wishList.innerHTML = "";

    data.forEach(wish => {
        console.log("wish:", wish);

        wishList.appendChild(createWishCard(wish));
    });

    console.log("Hoàn thành");
}

function createPreview(text, maxLength = 180) {

    if (text.length <= maxLength) {
        return {
            preview: text,
            isLong: false
        };
    }

    let preview = text.slice(0, maxLength);

    const lastSpace = preview.lastIndexOf(" ");

    if (lastSpace > 0) {
        preview = preview.slice(0, lastSpace);
    }

    return {
        preview: preview + "...",
        isLong: true
    };
}

function openModal(name, message) {

    modalName.textContent = name;

    modalMessage.innerHTML =
        escapeHtml(message).replace(/\n/g, "<br>");

    modal.classList.add("active");

}

function closeModal() {

    modal.classList.remove("active");

}

function createWishCard(wish) {

    const result = createPreview(wish.message);

    const card = document.createElement("div");
    card.className = "wish-card";

    const content = document.createElement("div");
    content.className = "wish-content";

    const title = document.createElement("h3");
    title.textContent = wish.name;

    const divider = document.createElement("span");
    divider.className = "wish-divider";
    divider.textContent = "✦";

    const message = document.createElement("div");
    message.className = "wish-message";
    message.innerHTML =
        escapeHtml(result.preview).replace(/\n/g, "<br>");

    content.appendChild(title);
    content.appendChild(divider);
    content.appendChild(message);

    if (result.isLong) {

        const button = document.createElement("button");

        button.className = "read-more";

        button.textContent = "Read more ✦";

        button.addEventListener("click", () => {

            openModal(wish.name, wish.message);

        });

        content.appendChild(button);

    }

    card.appendChild(content);

    return card;

}

async function loadWishes() {

    const { data, error } = await supabaseClient
        .from("wishes")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {

        console.error(error);

        return;

    }

    wishList.innerHTML = "";

    data.forEach(wish => {

        wishList.appendChild(createWishCard(wish));

    });

}

async function sendNewWish() {

    const name = document.getElementById("wishName").value.trim();

    const message = document.getElementById("wishMessage").value.trim();

    const status = document.getElementById("wishStatus");

    if (!name || !message) {

        status.innerText =
            "Hãy cho mình biết tên và lời chúc của bồ nhé!";

        return;

    }

    const { error } = await supabaseClient
        .from("wishes")
        .insert([{
            name,
            message
        }]);

    if (error) {

        console.error(error);

        status.innerText =
            "Oops, chưa gửi được lời chúc, bồ thử lại nha.";

        return;

    }

    status.innerText =
        "Cảm ơn bồ đã trở thành một trong những bông hoa trên ngọn đồi của Wonwoo";

    document.getElementById("wishName").value = "";

    document.getElementById("wishMessage").value = "";

    loadWishes();

}

if (sendWish) {

    sendWish.addEventListener("click", sendNewWish);

}

if (closeBtn) {

    closeBtn.addEventListener("click", closeModal);

}

if (modal) {

    modal.addEventListener("click", (e) => {

        if (e.target === modal) {

            closeModal();

        }

    });

}

document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {

        closeModal();

    }

});
console.log("Chuẩn bị gọi loadWishes");
loadWishes();
