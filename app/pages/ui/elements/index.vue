<script setup>
const isPlusRotate = ref(false);
const count = ref(1);
const countAll = ref(15);
const isBullet = ref(false);
const networks = [
  { link: 'https://vk.com/kanal_tv3', title: 'ВКонтакте' },
  { link: 'https://ok.ru/tv3russia', title: 'Одноклассники' },
  { link: 'https://t.me/tv3russia', title: 'Telegram' },
  { link: 'https://rutube.ru/feeds/tv3/', title: 'RuTube' },
  { link: 'https://yappy.media/profile/a8bd530d3ed743ac94b7eba2117c91ba', title: 'Yappy' },
  { link: 'https://zen.yandex.ru/telekanaltv3', title: 'Дзен' }
];

// const { data: images, pending, error } = await useFetch(
//   "https://www.gazprom-media.com/api/news?page=9&per_page=1"
// );

const rawItemsBussines = [
  { id: 1, slug: "televidenie", name: "Телевидение" },
];

const rawItemsBus = [
  { id: 1, slug: "", logo: "https://www.gazprom-media.com/storage/uploads/partner/logo/0/13/451/13451/нтв-рус.png" },
];
const newsItem = {
  "id": 1002,
  "name": "НТВ",
  "slug": "ntv",
  "link": "http://www.ntv.ru/",
  "sub_name": null,
  "sub_link": null,
  "image": null,
  "image_webp": null,
  "video": "https://www.gazprom-media.com/storage/uploads/partner/video/0/10/479/10479/НТВ-cut.mp4",
  "logo": "https://www.gazprom-media.com/storage/uploads/partner/logo/0/13/451/13451/нтв-рус.png",
  "logo_webp": "https://www.gazprom-media.com/storage/uploads/partner/logo/0/13/451/13451/нтв-рус-webp.webp",
  "logo_alt": "НТВ лого",
  "logo_hover": "https://www.gazprom-media.com/storage/uploads/partner/logo_hover/0/8/97/8097/b75a10d83ce7ee4c0f92298b9cc02d1b.png",
  "logo_hover_webp": "https://www.gazprom-media.com/storage/uploads/partner/logo_hover/0/8/97/8097/b75a10d83ce7ee4c0f92298b9cc02d1b-webp.webp",
  "text": "НТВ – крупнейший коммерческий телеканал России, ведущий федеральное вещание более 30 лет. Канал занимает уверенное второе место среди всех телеканалов страны, за полные 11 месяцев 2024 года доля НТВ в аудитории 4+ составила 9,6%, в 18+ – 10,0%. На протяжении 15 лет НТВ – лидер в выходные дни в утреннем слоте в аудитории 14-44.",
  "start": "1993",
  "country": "Россия, СНГ, Европа, Ближний Восток, Северная Америка, Австралия",
  "email": "info@ntv.ru",
  "phone": null,
  "address": "127427, Москва, ул. Ак. Королева, 12",
  "gradient": 2,
  "show_channels_pages": 0,
  "is_active": true,
  "sections": [],
  "last_news": [
    {
      "id": 8483,
      "name": "Интервью с главным режиссером Дирекции информации НТВ Михаилом Смирновым",
      "slug": "interviu-s-glavnym-rezisserom-direkcii-informacii-ntv-mixailom-smirnovym",
      "date": "2026-05-25",
      "author": null,
      "preview": "https://www.gazprom-media.com/storage/uploads/news/preview/0/30/945/30945/6a141d9de2201.png",
      "preview_webp": "https://www.gazprom-media.com/storage/uploads/news/preview/0/30/945/30945/6a141d9de2201-webp.webp",
      "preview_alt": "Интервью с главным режиссером дирекции информации НТВ Михаилом Смирновым превью",
      "image": "https://www.gazprom-media.com/storage/uploads/news/image/0/30/944/30944/6a141d9baa949.png",
      "image_webp": "https://www.gazprom-media.com/storage/uploads/news/image/0/30/944/30944/6a141d9baa949-webp.webp",
      "image_alt": "Интервью с главным режиссером Дирекции информации НТВ Михаилом Смирновым обложка",
      "image_mobile": "https://www.gazprom-media.com/storage/uploads/news/image/0/30/944/30944/6a141d9baa949-mobile.webp",
      "thumb": "https://www.gazprom-media.com/storage/uploads/news/image/0/30/944/30944/6a141d9baa949.png",
      "thumb_webp": "https://www.gazprom-media.com/storage/uploads/news/image/0/30/944/30944/6a141d9baa949-webp.webp",
      "video": null,
      "gallery": [],
      "files": [],
      "video_gallery": [],
      "preview_title": "",
      "partner_name": "НТВ",
      "sections": [
        {
          "type": "text",
          "position": 0,
          "config": {
            "text_ru": "<p>Хотим познакомить вас с нашими читателями. Расскажите немного о себе: чем вы занимаетесь на телевидении?</p>"
          },
          "locale": "ru"
        },
        {
          "type": "quote",
          "position": 1,
          "config": {
            "img": null,
            "fio_ru": "Михаил Смирнов",
            "text_ru": "<p>Меня зовут Михаил Смирнов, я режиссер Дирекции информации НТВ. В двух словах — отвечаю за то, как выглядят новости: их форму, визуальное оформление, дизайн. Плюс занимаюсь спецпроектами. Это может быть и выездная студия на ПМЭФ, и организация вещания на турнире «Игры будущего» в Казани и многое другое.</p>",
            "position_ru": "Режиссер Дирекции информации НТВ"
          },
          "locale": "ru"
        },
        {
          "type": "text",
          "position": 2,
          "config": {
            "text_ru": "<p>Помните, с чего началась ваша телевизионная карьера?</p>"
          },
          "locale": "ru"
        },
        {
          "type": "quote",
          "position": 3,
          "config": {
            "img": null,
            "fio_ru": "",
            "text_ru": "<p>Конечно, помню. Я пришел на телевидение по объявлению. Это был 1991 год. Ехал я как-то в троллейбусе, вышел прогуляться у Останкинского пруда и увидел объявление: требуется техник-электрик в Телевизионный технический центр. А я как раз только что закончил техникум по этой специальности. Меня взяли сразу. Сначала работал инженером студии, потом стал ассистентом режиссера, потом был режиссером на разных выпусках новостей. А с прошлого года я главный режиссер Дирекции информации НТВ. Так что на телевидении уже больше 30 лет.</p>",
            "position_ru": ""
          },
          "locale": "ru"
        },
        {
          "type": "text",
          "position": 4,
          "config": {
            "text_ru": "<p>Был ли у вас случай, когда навык, не связанный напрямую с режиссурой, помог справиться с задачей?</p>"
          },
          "locale": "ru"
        },
        {
          "type": "quote",
          "position": 5,
          "config": {
            "img": null,
            "fio_ru": "",
            "text_ru": "<p>О, да это сплошь и рядом. Когда едешь в командировку — чем только не приходится заниматься. Ты и электрик, и плотник, и землекоп, и даже сборщик мебели. Однажды мы с Кириллом Поздняковым (ведущий НТВ – прим.) снимали документалку в Америке. Нам нужно было взять интервью в гостиничном номере, но сделать так, чтобы никто не догадался, что это гостиница. Чтобы выглядело как обычная квартира или дом героя. И что вы думаете? Мы с оператором разобрали кровати до последнего винтика. Все по частям сложили. Отснялись — и назад собрали. Никто так и не узнал, что мы полностью «разгромили» номер.</p>",
            "position_ru": ""
          },
          "locale": "ru"
        },
        {
          "type": "text",
          "position": 6,
          "config": {
            "text_ru": "<p>Есть ли у вас собственные приемы (лайфхаки) в работе, до которых никто другой не додумался?</p>"
          },
          "locale": "ru"
        },
        {
          "type": "quote",
          "position": 7,
          "config": {
            "img": null,
            "fio_ru": "",
            "text_ru": "<p>В старой студии, когда мы еще вещали из ТТЦ «Останкино», помещение было с хитрой конфигурацией. И тогда мы вместе с моим коллегой и другом Станиславом Сидоровым, возглавляющим Департамент телепроизводства НТВ, придумали фишку: выпуск начинается с выхода ведущей — и она не сидит, а стоит. Или, например, у нас есть программа «Поздняков», где ведущий и гость сидят в кадре. И мы с оператором-постановщиком Алексеем Кременецким предложили показывать в кадре не только героев, но и осветительные приборы, камеры — такую изнанку съемок. Получилась очень технологичная картинка.</p>",
            "position_ru": ""
          },
          "locale": "ru"
        },
        {
          "type": "text",
          "position": 8,
          "config": {
            "text_ru": "<p>Что помогает вам быть в ресурсе? Как восстанавливаете силы? Чем увлекаетесь в свободное время?</p>"
          },
          "locale": "ru"
        },
        {
          "type": "quote",
          "position": 9,
          "config": {
            "img": null,
            "fio_ru": "",
            "text_ru": "<p>Во-первых, меня подпитывают коллеги. У нас со многими доверительные отношения, и мы, как сейчас модно говорить, на одной волне. Во-вторых, это спорт. Он уже стал частью жизни. Три раза в неделю стабильно хожу в зал. А из хобби — люблю рыбалку, очень люблю бывать на природе и готовить что-нибудь сам на открытом огне. Считаю, что каждый мужчина должен это уметь. Чувствуешь себя настоящим.</p>",
            "position_ru": ""
          },
          "locale": "ru"
        },
        {
          "type": "text",
          "position": 10,
          "config": {
            "text_ru": "<p>Чтобы вы посоветовали ребятам, которые сейчас учатся и хотят попасть на ТВ? Как двигаться к своей цели?</p>"
          },
          "locale": "ru"
        },
        {
          "type": "quote",
          "position": 11,
          "config": {
            "img": null,
            "fio_ru": "",
            "text_ru": "<p>Первое — не бояться. Это вообще железное правило: лучше сделать и пожалеть, чем не сделать и пожалеть. Дальше — надо спрашивать, переспрашивать. Люблю поговорку, многие ее уже за мной повторяют: «Лучше дураком до, чем умным после». Поэтому сомневаешься — переспроси хоть пять раз, но сделай как надо. И третье, для молодых особенно: нужно быть психологически устойчивыми. В информационном вещании очень много стресса. Так что контролируй эмоции, свои действия и взвешивай решения.</p>",
            "position_ru": ""
          },
          "locale": "ru"
        },
        {
          "type": "text",
          "position": 12,
          "config": {
            "text_ru": "<p>Что для вас НТВ?</p>"
          },
          "locale": "ru"
        },
        {
          "type": "quote",
          "position": 13,
          "config": {
            "img": null,
            "fio_ru": "",
            "text_ru": "<p>Для меня НТВ — это семья. Здесь работают люди, которые в большинстве своем думают так же, как я, и хотят того же в профессии. Многие стали уже близкими друзьями. Да что там говорить — я даже с женой познакомился именно здесь. Наша история любви случилась на НТВ. Я режиссер, она — выпускающий редактор. Понимаем друг друга с полуслова. Вот так и живем.</p>",
            "position_ru": ""
          },
          "locale": "ru"
        },
        {
          "type": "text",
          "position": 14,
          "config": {
            "text_ru": "<p>Ну, и последний вопрос: за что вы любите свою профессию?</p>"
          },
          "locale": "ru"
        },
        {
          "type": "quote",
          "position": 15,
          "config": {
            "img": null,
            "fio_ru": "",
            "text_ru": "<p>Я ее люблю за то, что можно постоянно двигаться вперед и не стоять на месте. Здесь никогда не бывает скучно. Даже рутина — и та превращается во что-то необычное.</p>",
            "position_ru": ""
          },
          "locale": "ru"
        }
      ],
      "last_news": null,
      "created_at": "2026-05-25T09:59:55.000000Z",
      "partner_logo": "https://www.gazprom-media.com/storage/uploads/partner/logo/0/13/451/13451/нтв-рус.png",
      "partner_logo_webp": "https://www.gazprom-media.com/storage/uploads/partner/logo/0/13/451/13451/нтв-рус-webp.webp",
      "partner_logo_hover": "https://www.gazprom-media.com/storage/uploads/partner/logo_hover/0/8/97/8097/b75a10d83ce7ee4c0f92298b9cc02d1b.png",
      "partner_logo_hover_webp": "https://www.gazprom-media.com/storage/uploads/partner/logo_hover/0/8/97/8097/b75a10d83ce7ee4c0f92298b9cc02d1b-webp.webp"
    },
    {
      "id": 8414,
      "name": "Школьники московского медиакласса побывали на съемках шоу «Суперстар! Битва сезонов» на НТВ",
      "slug": "skolniki-mediaklassa-pobyvali-na-sieemkax-sou-superstar-bitva-sezonov-na-ntv",
      "date": "2026-03-17",
      "author": null,
      "preview": "https://www.gazprom-media.com/storage/uploads/news/preview/0/30/691/30691/69b916b3b6e52.png",
      "preview_webp": "https://www.gazprom-media.com/storage/uploads/news/preview/0/30/691/30691/69b916b3b6e52-webp.webp",
      "preview_alt": "Школьники медиакласса побывали на съемках шоу «Суперстар! Битва сезонов» на НТВ превью",
      "image": "https://www.gazprom-media.com/storage/uploads/news/image/0/30/692/30692/69b916b0b4ad8.png",
      "image_webp": "https://www.gazprom-media.com/storage/uploads/news/image/0/30/692/30692/69b916b0b4ad8-webp.webp",
      "image_alt": "Школьники московского медиакласса побывали на съемках шоу «Суперстар! Битва сезонов» на НТВ обложка",
      "image_mobile": "https://www.gazprom-media.com/storage/uploads/news/image/0/30/692/30692/69b916b0b4ad8-mobile.webp",
      "thumb": "https://www.gazprom-media.com/storage/uploads/news/image/0/30/692/30692/69b916b0b4ad8.png",
      "thumb_webp": "https://www.gazprom-media.com/storage/uploads/news/image/0/30/692/30692/69b916b0b4ad8-webp.webp",
      "video": null,
      "gallery": [],
      "files": [],
      "video_gallery": [],
      "preview_title": "",
      "partner_name": "НТВ",
      "sections": [
        {
          "type": "text",
          "position": 0,
          "config": {
            "text_ru": "<p>В рамках образовательно-практического проекта «PROфнавигатор» «Газпром-Медиа Холдинга»  ученики московской школы № 1347 отправились к телеканалу НТВ на съемочную площадку седьмого выпуска шоу «Суперстар! Битва сезонов», который был посвящен творчеству Филиппа Киркорова. Народный артист России был одним из членов жюри.</p><p><br></p><p>До съемок шоу школьники смогли вживую понаблюдать, как проходит репетиция, как артисты готовятся к шоу, и пообщались с Шурой – одним из участников этого сезона: артист поделился, какими навыками нужно обладать, чтобы добиться успеха на ТВ.</p><p><br></p><p>Также ребятам была проведена экскурсия, в ходе которой они увидели закулисье шоу, узнали, как устроен съемочный процесс изнутри, посмотрели звукозаписывающую студию, вышли на сцену и прошли путь участника шоу.</p><p><br></p><p>Ученики медиакласса приняли участие и в съемках шоу, они не просто были зрителями на танцплощадке, а активно помогали съемочной группе: аплодировали, наблюдали за работой режиссера и операторов. Это была отличная возможность своими глазами увидеть «кухню» популярного шоу, пообщаться с профессионалами своего дела и зарядиться энергией от выступлений любимых артистов. </p><p><br></p><p>Участие учеников в шоу состоялась в рамках проекта «Медиакласс в московской школе» и образовательно-практического проекта «Газпром-Медиа Холдинга» «PROфнавигатор», которые знакомят учащихся с медиаиндустрией и формируют первые профессиональные навыки в этой сфере.</p><p>НТВ входит в «Газпром-Медиа Холдинг».</p>"
          },
          "locale": "ru"
        }
      ],
      "last_news": null,
      "created_at": "2026-03-17T08:54:08.000000Z",
      "partner_logo": "https://www.gazprom-media.com/storage/uploads/partner/logo/0/13/451/13451/нтв-рус.png",
      "partner_logo_webp": "https://www.gazprom-media.com/storage/uploads/partner/logo/0/13/451/13451/нтв-рус-webp.webp",
      "partner_logo_hover": "https://www.gazprom-media.com/storage/uploads/partner/logo_hover/0/8/97/8097/b75a10d83ce7ee4c0f92298b9cc02d1b.png",
      "partner_logo_hover_webp": "https://www.gazprom-media.com/storage/uploads/partner/logo_hover/0/8/97/8097/b75a10d83ce7ee4c0f92298b9cc02d1b-webp.webp"
    },
    {
      "id": 8334,
      "name": "Почему формат «Маски» оказался сильнее классических реалити-шоу",
      "slug": "pocemu-format-maski-okazalsia-silnee-klassiceskix-realiti-sou",
      "date": "2026-01-16",
      "author": null,
      "preview": "https://www.gazprom-media.com/storage/uploads/news/preview/0/30/88/30088/696a086a0f471.png",
      "preview_webp": "https://www.gazprom-media.com/storage/uploads/news/preview/0/30/88/30088/696a086a0f471-webp.webp",
      "preview_alt": "Почему формат «Маски» оказался сильнее классических реалити-шоу превью",
      "image": "https://www.gazprom-media.com/storage/uploads/news/image/0/30/89/30089/696a08684b532.png",
      "image_webp": "https://www.gazprom-media.com/storage/uploads/news/image/0/30/89/30089/696a08684b532-webp.webp",
      "image_alt": "Почему формат «Маски» оказался сильнее классических реалити-шоу обложка",
      "image_mobile": "https://www.gazprom-media.com/storage/uploads/news/image/0/30/89/30089/696a08684b532-mobile.webp",
      "thumb": "https://www.gazprom-media.com/storage/uploads/news/image/0/30/89/30089/696a08684b532.png",
      "thumb_webp": "https://www.gazprom-media.com/storage/uploads/news/image/0/30/89/30089/696a08684b532-webp.webp",
      "video": null,
      "gallery": [],
      "files": [],
      "video_gallery": [],
      "preview_title": "",
      "partner_name": "НТВ",
      "sections": [
        {
          "type": "text",
          "position": 0,
          "config": {
            "text_ru": "<p>Формат The Masked Singer, на котором основана российская «Маска», привлекает внимание не только вокальными номерами, но и встроенным элементом детективной игры.&nbsp;</p><p><br></p><p>Зрителя здесь буквально приглашают стать соучастником процесса: разгадывать личность участника, собирать улики, сопоставлять подсказки и строить собственные версии. В результате просмотр перестаёт быть пассивным. Он превращается в интеллектуальную игру, которая продолжается за пределами эфира.</p><p><br></p><p>В отличие от большинства реалити-шоу, сосредоточенных исключительно на таланте или драматургии личных историй, формат «Маски» добавляет самостоятельную когнитивную задачу для аудитории. Зритель не просто оценивает исполнение, а вовлекается в процесс анализа и угадывания. Это удерживает внимание и стимулирует возвращаться к новым выпускам. Именно поэтому уже семь сезонов в эфире НТВ выходит шоу «Маска», стабильно показывая хорошие рейтинги.</p><p><br></p><p>8 февраля в 20:20 состоится премьера нового сезона. Не пропустите.</p>"
          },
          "locale": "ru"
        }
      ],
      "last_news": null,
      "created_at": "2026-01-16T09:44:08.000000Z",
      "partner_logo": "https://www.gazprom-media.com/storage/uploads/partner/logo/0/13/451/13451/нтв-рус.png",
      "partner_logo_webp": "https://www.gazprom-media.com/storage/uploads/partner/logo/0/13/451/13451/нтв-рус-webp.webp",
      "partner_logo_hover": "https://www.gazprom-media.com/storage/uploads/partner/logo_hover/0/8/97/8097/b75a10d83ce7ee4c0f92298b9cc02d1b.png",
      "partner_logo_hover_webp": "https://www.gazprom-media.com/storage/uploads/partner/logo_hover/0/8/97/8097/b75a10d83ce7ee4c0f92298b9cc02d1b-webp.webp"
    }
  ],
  "channels": [],
  "seo": {},
  "socials": [],
  "statistics": [],
  "categories": [],
  "files": [],
  "careers_count": 0,
  "links": {}
}

</script>

<template>
  <div>
    <br />
    <br />
    <Text :variant="$typographyVariant.T_NORMAL_24" :font="$font.TTSMALLS_REGULAR"> 
      ELEMENTS
    </Text>
    <br />
    <br />

    <!-- Логотип -->
    <div class="line line--first">
    <Logo />
    </div>

    <!-- ССЫЛКИ -->
    <div class="line line--mob">
      <Links 
        link="/about" 
        text="Стандартная ссылка"
      />
      <span>Убрали из дизайна - "Ссылка с обратной стрелкой"</span>
      <!-- <Links
        isRevert
        link="/about"
        text="Ссылка с обратной стрелкой "
      /> -->
    </div>

    <!-- КНОПКИ -->
    <div class="line line--mob">
      <ButtonPervious
        link="/media"
        text="Назад к новостям"
      />
      <ButtonPervious
        :color="$color.GRAY"
        link="/business"
        text="Назад к активам"
      />
    </div>

    <div class="line line--mob">
      <ButtonMore text="Показать ещё" />
      <div>
        <ButtonMore 
          :isRotate="isPlusRotate"
          text="Открыть"
          @click="isPlusRotate = !isPlusRotate"
        />
        <Text 
          v-if="isPlusRotate"
          :variant="$typographyVariant.T_BUTTON_24" 
          :font="$font.TTSMALLS_REGULAR"> 
          текст
        </Text>
      </div>
    </div>

    <!-- Социальные сети -->
    <div class="line">
      <SocialList
        :socials="networks"
        :color="$color.WHITE"
        mode="link"
      />
    </div>

    <div class="line">
      <SocialList
        :color="$color.GRAY"
        mode="share"
      />
    </div>
    
    <!-- Пагинация слайдера -->
    <div class="line">
      <PaginationNumber
        :numbCurrent="count"
        :numbAll="countAll"
        :prev="() => count--"
        :next="() => count++"
      />
    </div>
    
    
    <div class="line slider">
      <template v-for="(item) in 4" :key="item">
        <PaginationBullet
          animationDuration="4"
          :classActive="isBullet == item"
          @click="isBullet = item"
        />
      </template>
    </div>


    <div class="line line--chips">
      <Chips 
        name="НТВ" 
        link="/business/partner/sportivnye-telekanaly#channel4"
        :hoverColor="$color.C_2758"
      />
      <Chips 
        name="МАТЧ! ПРЕМЬЕР" 
        link="/business/partner/sportivnye-telekanaly#channel4"
        :hoverColor="$color.C_285"
      />
      <Chips 
        name="РУССКАЯ НОЧЬ" 
        link="/business/partner/sportivnye-telekanaly#channel4"
        :hoverColor="$color.C_2925"
      />
    </div>
    
    <div class="line">
      <template v-for="items in images?.data" :key="items.id">
        <NewsCard 
          :news="items"
        />
      </template>
    </div>

    <div class="line line--notflex container-full">
      <PaginationPage 
        :text="$t('menu.media')"
        :link="`/${$i18n.locale}/media`"
      />
    </div>
    <br /><br />
    
    <div class="line line--notflex container-full">
      <AboutNavigation />
    </div>

    <div class="line line--notflex">
      <SplitNav
        textPrev="НТВ" 
        textNext="Пятница!" 
        logoPrev="https://www.gazprom-media.com/storage/uploads/partner/logo/0/13/451/13451/нтв-рус.png" 
        logoNext="https://www.gazprom-media.com/storage/uploads/partner/logo/0/13/490/13490/пятница-рус.png" 
        linkPrev="/business/partner/ntv"
        linkNext="/business/partner/pyatnica"
      />
    </div>

    <div class="line line--notflex">
      <SplitNav
        textPrev="Предыдущая новость" 
        textNext="Следующая новость"
        linkPrev="/media/prev"
        linkNext="/media/next"
        news="true"
      />
    </div>

    <br /><br />
    <!-- Первая сетка: адаптивная (1 или 3 колонки), ховер подсвечивает фон -->

    <div class="line line--notflex container-full-small">
      <AssetsDirection 
        :rawItems="rawItemsBussines"
        variant="bg" 
      />
    </div>

    <!-- Вторая сетка: всегда 3 колонки, ховер утолщает нижнюю линию -->
    <div class="line line--notflex container-full">
      <div class="card-direction">
        <AssetsDirection 
          :rawItems="rawItemsBus"
          variant="line" 
        />
      </div>
    </div>


    <br /><br />
    <div class="line line--notflex assetsnews">
      <AssetsNews
        v-for="item in newsItem.last_news"
        :key="item.id"
        :date="item.created_at" 
        :text="item.name"
        :slug="item.slug"
      />
    </div>
    <br /><br /><br /><br />
  </div>
</template>

<style lang="scss" scoped>
.line {
  display: flex;
  gap: em(30);
  padding-top: em(40);
  &--first {
    padding-top: em(15);
  }
  &--notflex {
    display: block;
  }
  &--chips {
    gap: em(14);
  }
  &--mob {
    display: block;
    @include mq('desktop') {
      display: flex;
    }
  }
}
.slider {
  width: auto;
  gap: em(10);
}

.collapse {
  display: block;
  margin: 0;
  @include mq('desktop') {
    gap: em(30);
    margin: em(40) 0 em(40) em(30);
  } 
}

.card-direction {
  @include mq('desktop') {
    width: 50.78125%;
    margin-left: auto;
  } 
}

.assetsnews {
  background-color: var(--color-WHITE);
  padding-bottom: em(40);
}
</style>