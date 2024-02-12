import { surpriseMePrompts } from '../constants'
import FileSaver from 'file-saver'

function getRandomPrompt(prompt: string) {
    const randomIdx = Math.floor(Math.random() * surpriseMePrompts.length)
    const randomPrompt = surpriseMePrompts[randomIdx]

    if(randomPrompt === prompt)
        return getRandomPrompt(prompt)

    return randomPrompt
}

function downloadImage(_id: string, photo: string) {
    FileSaver.saveAs(photo, `download-${_id}.jpg`)
}

export { getRandomPrompt, downloadImage}