function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

function createPreview(text, maxLength = 220) {
    if (text.length <= maxLength) {
        return {
            preview: text,
            isLong: false
        };
    }

    return {
        function createPreview(text, maxLength = 180){

    if(text.length <= maxLength){
        return {
            preview: text,
            isLong: false
        };
    }

    // cắt tới khoảng trắng cuối cùng
    let preview = text.slice(0, maxLength);

    const lastSpace = preview.lastIndexOf(" ");

    if(lastSpace > 0){
        preview = preview.slice(0, lastSpace);
    }

    return {
        preview: preview + "...",
        isLong: true
    };
}
        isLong: true
    };
}

console.log("Wish JS loaded!");

const sendWish = document.getElementById("sendWish");


if(sendWish){

sendWish.addEventListener("click", async()=>{


    const name = document.getElementById("wishName").value.trim();

    const message = document.getElementById("wishMessage").value.trim();


    if(!name || !message){

        document.getElementById("wishStatus").innerText =
        "Hãy cho mình biết tên và lời chúc của bồ nhé!";

        return;

    }


    const { error } = await supabaseClient
        .from("wishes")
        .insert([
            {
                name: name,
                message: message
            }
        ]);



    if(error){

        console.error(error);

        document.getElementById("wishStatus").innerText =
        "Oops, chưa gửi được lời chúc, bồ thử lại nha.";

    } else {


        document.getElementById("wishStatus").innerText =
        "Cảm ơn bồ đã trở thành một trong những bông hoa trên ngọn đồi của Wonwoo";


        document.getElementById("wishName").value = "";
        document.getElementById("wishMessage").value = "";
        
        loadWishes();

    }


});


}
async function loadWishes(){

    const { data, error } = await supabaseClient
        .from("wishes")
        .select("*")
        .order("created_at", { ascending: false });


    if(error){

        console.error(error);
        return;

    }


    const wishList = document.getElementById("wishList");

    wishList.innerHTML = "";


    data.forEach(wish => {

    const result = createPreview(wish.message);

    wishList.innerHTML += `
    <div class="wish-card">

        <div class="wish-content">

            <h3>${escapeHtml(wish.name)}</h3>

            <span class="wish-divider">✦</span>

            <div class="wish-message">
                ${escapeHtml(result.preview)}
            </div>

            ${
                result.isLong
                ? `<button class="read-more"
                        data-name="${escapeHtml(wish.name)}"
                        data-message="${escapeHtml(wish.message)}">
                        Read more ✦
                   </button>`
                : ""
            }

        </div>

    </div>
    `;
});
document.querySelectorAll(".read-more").forEach(btn => {

    btn.addEventListener("click", () => {

        document.getElementById("modalName").textContent =
            btn.dataset.name;

        document.getElementById("modalMessage").innerHTML =
    escapeHtml(btn.dataset.message).replace(/\n/g, "<br>");

        document.getElementById("wishModal").classList.add("active");

    });

});
}

document.addEventListener("DOMContentLoaded", () => {

    const modal = document.getElementById("wishModal");
    const closeBtn = document.getElementById("closeWish");

    closeBtn.addEventListener("click", () => {
        modal.classList.remove("active");
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("active");
        }
    });

});

loadWishes();

