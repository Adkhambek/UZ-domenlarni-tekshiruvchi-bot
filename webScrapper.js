const axios = require("axios");
const { JSDOM } = require("jsdom");
const { cctldUrl } = require("./config");

const request = async (domain) => {
    const response = await axios.get(`${cctldUrl}/?domain=${domain}`);
    const dom = new JSDOM(response.data);
    const tableResponse =
        dom.window.document.querySelector(".table-responsive");
    if (tableResponse) {
        const tr = tableResponse.querySelectorAll("tbody tr");
        const firstTds = tr[0].querySelectorAll("td");
        const fourthTds = tr[3].querySelectorAll("td");
        const fifthTds = tr[4].querySelectorAll("td");

        const status = firstTds[3].textContent.trim();
        const dateCreated = fourthTds[1].textContent.trim();
        const activeUntil = fifthTds[1].textContent.trim();

        return {
            register: true,
            contact: `${cctldUrl}/sendmail/?domain=${domain}`,
            domain,
            status,
            dateCreated,
            activeUntil,
        };
    } else {
        return {
            register: false,
            message:
                "Домен бош, сиз уни қуйидаги рўйхатга ўтказувчилар орқали роҳатлан ўтказишингиз мумкин:",
            provider: [
                {
                    name: "Ahost",
                    price: "17 000 сум",
                    url: "https://www.ahost.uz/",
                },
                {
                    name: "Clouds",
                    price: "17 500 сум",
                    url: "https://vclouds.biz/domen/",
                },
                {
                    name: "Beeline",
                    price: "20 125 сум",
                    url: "https://cloud.beeline.uz/domain/",
                },
                {
                    name: "Webname",
                    price: "24 500 сум",
                    url: "https://webname.uz/",
                },
                {
                    name: "Eskiz",
                    price: "24 000 сум",
                    url: "https://eskiz.uz/",
                },
            ],
        };
    }
};

request("smartshop.uz");
