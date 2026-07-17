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

wishList.innerHTML += `
<div class="wish-card">

    <div class="wish-content">

        <h3>${wish.name}</h3>

        <span class="wish-divider">✦</span>

        <div class="wish-message">
            ${wish.message}
        </div>

    </div>

</div>
`;
});

}

const emojiBtn = document.getElementById("emojiBtn");
const picker = document.getElementById("emojiPicker");
const textarea = document.getElementById("wishMessage");

emojiBtn.addEventListener("click", (e) => {
    e.stopPropagation();

    picker.style.display =
        picker.style.display === "block"
            ? "none"
            : "block";
});

picker.addEventListener("emoji-click", (event) => {

    const emoji = event.detail.unicode;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    textarea.setRangeText(
        emoji,
        start,
        end,
        "end"
    );

    textarea.focus();
});

document.addEventListener("click",(e)=>{

    if(
        !picker.contains(e.target) &&
        !emojiBtn.contains(e.target)
    ){
        picker.style.display="none";
    }

});
