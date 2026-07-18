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
        preview: text.slice(0, maxLength) + "...",
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
            btn.dataset.message.replace(/\n/g, "<br>");

        document.getElementById("wishModal").classList.add("active");

    });

});
}

const modal = document.getElementById("wishModal");

const closeBtn = document.getElementById("closeWish");

closeBtn.onclick = () => {

    modal.classList.remove("active");

};

modal.onclick = (e) => {

    if (e.target === modal) {

        modal.classList.remove("active");

    }

};

loadWishes();

