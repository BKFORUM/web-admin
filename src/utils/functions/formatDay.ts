import dayjs from 'dayjs';
import 'dayjs/locale/vi';

export const formatDayVN = (dateTime: string): string => {
    var myDate = new Date(dateTime)
    myDate.setMinutes(myDate.getMinutes())
    const originalTime = dayjs(myDate).format('DD/MM/YYYY');
    return originalTime.toString()
}

export const formatDateFormDateLocal = (dateTime: string): string => {
    const formattedDate = dayjs(dateTime).locale('vi').format('DD-MM-YYYY');
    return formattedDate

}

