document.getElementById("navbar").style.display='none';
document.getElementById('banner').style.display='block';
document.getElementById("vocab").style.display='none';
document.getElementById("faq").style.display='none';
document.getElementById("footer").style.display='block';


document.getElementById('submit-btn').addEventListener('click',function(e){
    e.preventDefault();
    
    const Name=document.getElementById("name").value;
    const Pass=document.getElementById('pass').value;

    const Convert_pass=parseInt(Pass);

    if(!Name){
        alert("Please tell use your name first")
       return;
    }
    if (Convert_pass === 123456) {

        
        Swal.fire({
            icon: 'success',
            title: 'Login Successful!',
            text: `Welcome, ${Name}!`,
            timer: 2000,
            showConfirmButton: false
        }).then(() => {
            document.getElementById("navbar").style.display = 'block';
            document.getElementById('banner').style.display = 'none';
            document.getElementById("vocab").style.display = 'block';
            document.getElementById("faq").style.display = 'block';
            document.getElementById("footer").style.display = 'block';
        });
        
    }
    else{
        alert("Wrong Password. Contact admin to get your login Code");
        return;
    }

    
})

document.getElementById("logout-btn").addEventListener('click',function(e){
    e.preventDefault();

    document.getElementById("navbar").style.display='none';
    document.getElementById("vocab").style.display='none';
    document.getElementById('banner').style.display='block';
    document.getElementById("footer").style.display='block';
    document.getElementById("faq").style.display='none';

})

document.getElementById('learn-btn').addEventListener('click', function() {
    document.getElementById('vocab').scrollIntoView({
        behavior: 'smooth',
        block: "start"
    });
});

document.getElementById('faq-btn').addEventListener('click', function() {
    document.getElementById('faq').scrollIntoView({
        behavior: 'smooth',
        block: "start"
    });
});




function VocabCategories(){

    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res)=>res.json())
    .then((val)=>displayCategories(val.data))

}





function loadVocab(id){
    const url=`https://openapi.programming-hero.com/api/level/${id}`
    
    const vocabContainer = document.getElementById("vocab-container");
    
    vocabContainer.innerHTML = `
        <div class="flex justify-center items-center py-16 col-span-3">
            <span class="loading loading-dots loading-xl"></span>
        </div>
    `;



    fetch(url)
    .then((response)=>response.json())
    .then((item)=>{
        removeActiveClass();
        const clickButton=document.getElementById(`btn-${id}`);
        clickButton.classList.add("active")
        
        displayVocab(item.data)
    })
}




function displayModal(data) {

    
     document.getElementById("modal_details").showModal();
    
     if(!data.meaning){
        data.meaning="অর্থ পাওয়া যায়নি"
    }
   
     const modalContainer=document.getElementById("modal-container");
     modalContainer.innerHTML=`
     
        <div class="p-8">

                    <h3 class="text-xl font-bold mt-4 mb-8">${data.word} (<i class="fa-solid fa-microphone-lines"></i>:${data.pronunciation})</h3>
                    <h3 class="text-lg font-bold mb-1">Meaning</h3>
                    <p class="text-lg font-semibold mb-4">${data.meaning}</p>
                    <p class="text-lg font-semibold">Example</p>
                    <p class="mb-8 text-[#2e2d2d] text-lg">${data.sentence}</p>
                    <p  class="text-lg font-semibold mb-1">সমার্থক শব্দ গুলো</p>
                    <div id="s-container" class="flex  gap-1">
                    </div>
        </div>
     
     `
     const sContainer=document.getElementById("s-container");
     for(let i=0; i<data.synonyms.length; i++){
        sContainer.innerHTML+=`
        
          <div class="flex  flex-col gap-1">
            <p class="bg-[#D7E4EF] py-2 px-5 rounded-md   w-fit" >${data.synonyms[i]}</p>

          </div>
        `
     }

    
}

function loadModal(mid){
    const ul=`https://openapi.programming-hero.com/api/word/${mid}`
    console.log(ul)
    fetch(ul)
    .then((mal)=>mal.json())
    .then((tal)=>displayModal(tal.data))
    
}



function displayVocab(data){
    
    const vocabContainer= document.getElementById("vocab-container");
    vocabContainer.innerHTML=" ";
    
    if(data.length==0){
        vocabContainer.innerHTML = `
        
         <div class="flex flex-col justify-center text-center items-center col-span-3 py-16">
                <img src="assets/alert-error.png" alt="">
                <p class="text-sm mt-1 text-[#79716B]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <h1 class="text-xl font-bold mt-3">নেক্সট Lesson এ যান</h1>
            </div>
        
        
        `;
        return;
    }
    
    for(let x of data ){

       

        const vocabDiv=document.createElement("div")
        
        if(!x.meaning){
            x.meaning="অর্থ পাওয়া যায়নি"
        }
       
        vocabDiv.innerHTML=`
        
        <div class="card  bg-base-100 card-lg shadow-sm   text-center">
            <div class="card-body hover:bg-[#1A91FF1A] ">
              <h2 class="text-2xl font-bold">
                ${x.word}
              </h2>
              <p class="font-semibold mt-1 mb-3">
                Meaning /Pronounciation
              </p>
              <p class="text-lg md:text-xl font-semibold text-[#39393d]">
                ${x.meaning} / ${x.pronunciation}
              </p>
              <div class="justify-between card-actions mt-8">
                <button onclick="loadModal(${x.id})"  class="btn btn-sm hover:bg-white bg-[#1A91FF1A] modal-btn"><i class="fa-solid fa-info"></i></button>
                <button class="btn  hover:bg-white btn-sm bg-[#1A91FF1A]"><i class="fa-solid fa-volume-high"></i></button>
              </div>
            </div>
          </div>
        
        `
        vocabContainer.append(vocabDiv);
    }

   
}






function removeActiveClass(){
    const activeCls=document.getElementsByClassName("active");
    for(let btn of activeCls){
        btn.classList.remove("active");
    }
}

function displayCategories(data){
    const btnContainer=document.getElementById('all-btn');

    for(let cat of data){
     const btnDiv=document.createElement("div")
     btnDiv.innerHTML=`<button id="btn-${cat.level_no}" onclick="loadVocab(${cat.level_no})" class="btn btn-outline w-full btn-primary"><i class="fa-solid fa-book-open"></i>${cat.lessonName}</button>`;
     btnContainer.append(btnDiv);
    }
}

VocabCategories();
