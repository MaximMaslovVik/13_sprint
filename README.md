# 13_sprint
12 спринт  основа 13 спринта
Проектная работа 13
Начнём делать REST API проекта Mesto и свяжем его с базой данных.
1. Настройте линтер
Eslint ругается на переменную _id. Согласно стайлгайду Airbnb, в JavaScript не следует использовать нижние подчёркивания для имён идентификаторов.
Изменим это правило. В файл .eslintrc добавьте исключение для идентификатора _id. Разберитесь самостоятельно, как это сделать.
Инструкция по конфигурации правил линтера: https://eslint.org/docs/user-guide/configuring#using-configuration-files
Как настроить нужное правило: https://eslint.org/docs/rules/no-underscore-dangle
2. Подключитесь к Mongo
В app.js подключитесь к серверу MongoDB по адресу:
mongodb://localhost:27017/mestodb
mestodb — имя базы данных, которая будет создана.
3. Создайте схемы и модели
В проекте две сущности: пользователя и карточки. Создайте схему и модель для каждого.
Поля схемы пользователя.
name — имя пользователя, строка от 2 до 30 символов, обязательное поле;
about — информация о пользователе, строка от 2 до 30 символов, обязательное поле;
avatar — ссылка на аватарку, строка, обязательно поле.
Поля схемы карточки:
name — имя карточки, строка от 2 до 30 символов, обязательное поле;
link — ссылка на картинку, строка, обязательно поле;
owner — ссылка на модель автора карточки, тип ObjectId, обязательное поле;
likes — список лайкнувших пост пользователей, массив ObjectId, по умолчанию — пустой массив (поле default).
createdAt — дата создания, тип Date, значение по умолчанию Date.now.
Модель пользователя назовите user, карточки — card. Для этого передайте имена моделей первым аргументом методу mongoose.model:
module.exports = mongoose.model('user', userSchema);
В этом задании самостоятельно разберитесь, как валидировать ссылки. Это описано в документации mongoose: https://mongoosejs.com/docs/validation.html
4. Создайте контроллеры и роуты для пользователей
Реализуйте три роута:
GET /users — возвращает всех пользователей
GET /users/:userId - возвращает пользователя по _id
POST /users — создаёт пользователя
В теле POST-запроса на создание пользователя передайте JSON-объект с тремя полями: name, about и avatar.
5. Создайте тестового пользователя
Сделайте это через Postman:
image
Затем откройте Compass — там должна появиться база данных с именем mestodb. Имя мы задали во втором пункте инструкции при подключении базы.
В базе появится коллекция users с одним пользователем, которого вы только что создали.
image
Скопируйте куда-нибудь _id этого пользователя, он сейчас нам понадобится.
6. Реализуйте временное решение авторизации
В карточке есть поле owner для хранения её автора. Но в запросе клиент передаёт только имя карточки и ссылку на картинку. В следующей теме вы узнаете, как решить эту проблему, а пока реализуйте временное решение.
В файле app.js создайте вот такой мидлвэр:
app.use((req, res, next) => {
    req.user = {
        _id: '5d8b8592978f8bd833ca8133' // вставьте сюда _id созданного в предыдущем пункте пользователя
    };

    next();
});
Она добавляет в каждый запрос объект user. Берите из него идентификатор пользователя в контроллере создания карточки:
module.exports.createCard = (req, res) => {
    console.log(req.user._id); // _id станет доступен
};
Это временное решение. Мы захардкодили идентификатор пользователя, поэтому кто бы ни создал карточку, в базе у неё будет один и тот же автор. Ничего страшного — исправим это в следующем спринте.
7. Создайте контроллеры и роуты для карточек
Реализуйте три роута:
GET /cards — возвращает все карточки
POST /cards — создаёт карточку
DELETE /cards/:cardId — удаляет карточку по идентификатору
В теле POST-запроса на создание карточки передайте JSON-объект с двумя полями: name и link.
8. Уберите лишнее
Удалите:
папку data вместе с её содержимым;
папку public и статическую раздачу страниц;
Теперь фронтенд живёт отдельно, а значит один из принципов REST выполнен.
Новая структура проекта должна выглядеть как-то так:
image
