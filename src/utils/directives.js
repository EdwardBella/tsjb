import { checkPermission } from './common'


export const permission = {
    inserted (el, {value}) {
        const display = el.style.display
        el.style.display = 'none'
        if (checkPermission(value)) {
            el.style.display = display
        } else {
            el.click = () => console.log('您没有权限')
            el.style.display = 'none'
        }
    },
}
