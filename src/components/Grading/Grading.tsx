import { observer } from "mobx-react"
import { PDFReader } from "../PDFReader/PDFReader"


export const Grading = observer((props: any) => {
    return (
        <div>
            <PDFReader />
        </div>
    )
})