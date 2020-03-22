import enLocale from 'd3-time-format/locale/en-US.json';
import ilLocale from 'd3-time-format/locale/he-IL.json';

export interface EventDropConfiguration {
    locale?: Object,
    metaballs?: {
        blurDeviation?: number,
        colorMatrix?: string,
    },
    bound?: {
        format?: Object,
        location?: string
    },
    axis?: {
        formats?: {
            milliseconds?: string,
            seconds?: string,
            minutes?: string,
            hours?: string,
            days?: string,
            weeks?: string,
            months?: string,
            year?: string,
        },
    },
    drop?: {
        color?: string,
        radius?: number,
        date?: Function,
        onClick?: Function,
        onMouseOver?: Function,
        onMouseOut?: Function,
        onDblClick?: Function,
        dropId?: Function,
        dropClass?: Function
        filterOverlap?: boolean
    },
    label?: {
        padding?: number,
        text?: any,
        width?: number,
    },
    line?: {
        color?: Function,
        height?: number,
    },
    margin?: {
        top?: number,
        right?: number,
        bottom?: number,
        left?: number,
    },
    range: {
        start: Date
        end: Date,
    },
    zoom?: {
        onZoomStart?: Function,
        onZoom?: Function,
        onZoomEnd?: Function,
        minimumScale?: number,
        maximumScale?: number,
    },
    highlight?: boolean,
    d3: Object,
    shapes: { [key: string]: Object }
}

const localeTimeFormat = (d3) => {
    d3.timeFormatDefaultLocale(enLocale);
    return d3.timeFormat('%Y %B %e');
};


export default d3 => ({
    locale: enLocale,
    metaballs: {
        blurDeviation: 10,
        colorMatrix: '1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 50 -10'
    },
    bound: {
        format: localeTimeFormat(d3),
        location: null
    },
    axis: {
        formats: {
            milliseconds: '%L',
            seconds: ':%S',
            minutes: '%I:%M',
            hours: '%I %p',
            days: '%a %d',
            weeks: '%b %d',
            months: '%B',
            year: '%Y'
        }
    },
    drop: {
        color: null,
        radius: 5,
        date: d => new Date(d),
        onClick: () => {
        },
        onMouseOver: () => {
        },
        onMouseOut: () => {
        },
        ondblclick: () => {
        },
        dropId: () => {
        },
        dropClass: () => {},
        filterOverlap: true
    },
    label: {
        padding: 20,
        text: d => `${d.name} (${d.data.length})`,
        width: 200
    },
    line: {
        color: (_, index) => d3.schemeCategory10[index],
        height: 40
    },
    margin: {
        top: 20,
        right: 10,
        bottom: 20,
        left: 10
    },
    range: {
        start: new Date(new Date().getTime() - 3600000 * 24 * 365), // one year ago
        end: new Date()
    },
    zoom: {
        onZoomStart: null,
        onZoom: null,
        onZoomEnd: null,
        minimumScale: 0,
        maximumScale: Infinity
    },
    highlight: true,
    shapes: {
        star: {
            path: 'M17.9419 11.7129C17.8283 11.3107 17.5785 11.0078 17.1919 10.8047L13.8395 9.00004 17.1919 7.19532C17.5785 6.99218 17.8285 6.68955 17.9419 6.28713 18.0552 5.88476 18.0028 5.50389 17.7842 5.14457L16.9777 3.85555C16.7593 3.49611 16.4339 3.26371 16.001 3.15822 15.5683 3.05294 15.1591 3.10174 14.7723 3.305L11.42 5.09778 11.42 1.50008C11.42 1.09376 11.2601 0.742198 10.9408 0.44531 10.6216 0.148423 10.2434 0 9.80659 0L8.19361 0C7.7566 0 7.37856 0.148546 7.05927 0.44531 6.74003 0.742157 6.58033 1.09376 6.58033 1.50008L6.58033 5.09778 3.2279 3.30488C2.84135 3.10162 2.43175 3.05265 1.9991 3.1581 1.56637 3.26371 1.24077 3.49599 1.02231 3.85543L0.215779 5.14449C-0.00281576 5.50381-0.0552573 5.88467 0.0581454 6.28705 0.171769 6.68934 0.421529 6.99214 0.808087 7.19524L4.16051 9.00012 0.808087 10.8048C0.421529 11.0079 0.171592 11.3106 0.0581454 11.713 -0.0552132 12.1153-0.00263918 12.496 0.215779 12.8553L1.02236 14.1445C1.24073 14.5041 1.56619 14.7364 1.99906 14.8421 2.43188 14.9472 2.8413 14.8985 3.22786 14.6951L6.58028 12.9022 6.58028 16.5001C6.58028 16.9061 6.73995 17.258 7.05923 17.5547 7.37851 17.8517 7.75669 18 8.19357 18L9.80654 18C10.2434 18 10.6217 17.8517 10.9407 17.5547 11.2602 17.258 11.4199 16.906 11.4199 16.5001L11.4199 12.9025 14.7722 14.6954C15.159 14.8985 15.5682 14.9476 16.0009 14.8421 16.4337 14.7364 16.7592 14.5043 16.9776 14.1447L17.7842 12.8556C18.0028 12.496 18.0552 12.1152 17.9419 11.7129Z',
            fill: 'green',
            offsetY: 20,
        }
    }
});
