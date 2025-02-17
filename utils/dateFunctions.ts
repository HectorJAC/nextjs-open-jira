import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

export const getFormatDistanceToNow = (date: number) => {
    const formNouw = formatDistanceToNow(date, {locale: es});

    return `Hace ${formNouw}`;
};
