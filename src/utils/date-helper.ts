export default class DateUtil {
    /**
     * 格式化时间
     * @param  {date} date      时间对象
     * @param  {string} formatStr 格式化字符串
     * @return {string}           格式化后的时间
     */
    static format(date, formatStr) {
        let str = formatStr;
        let Week = ['日', '一', '二', '三', '四', '五', '六'];

        str = str.replace(/yyyy|YYYY/g, date.getFullYear());
        str = str.replace(/yy|YY/g, (date.getYear() % 100) > 9 ? (date.getYear() % 100).toString() : '0' + (date.getYear() % 100));
        let month = date.getMonth() + 1;
        str = str.replace(/MM/g, month > 9 ? month.toString() : '0' + month);
        str = str.replace(/M/g, month);

        str = str.replace(/w|W/g, Week[date.getDay()]);

        str = str.replace(/dd|DD/g, date.getDate() > 9 ? date.getDate().toString() : '0' + date.getDate());
        str = str.replace(/d|D/g, date.getDate());

        str = str.replace(/hh|HH/, date.getHours() > 9 ? date.getHours().toString() : '0' + date.getHours());
        str = str.replace(/h|H/g, date.getHours());
        str = str.replace(/mm/g, date.getMinutes() > 9 ? date.getMinutes().toString() : '0' + date.getMinutes());
        str = str.replace(/m/g, date.getMinutes());

        str = str.replace(/ss|SS/g, date.getSeconds() > 9 ? date.getSeconds().toString() : '0' + date.getSeconds());
        str = str.replace(/s|S/g, date.getSeconds());
        return str;
    }

    /**
     * 与当前时间戳比较
     * @param date
     * @returns {number}
     */
    static compareCurTime(date){
        return Date.now() - new Date(date).getTime();
    }
}
