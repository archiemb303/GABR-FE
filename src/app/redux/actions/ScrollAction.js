export const SCROLL = 'SCROLL'

export const getScrollAction = (notification) => {
    return {
        type: SCROLL,
        payload: notification
    }
}