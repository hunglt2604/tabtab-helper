// Custom field
export type CustomFieldType = {
    id: number
    sectionId: number
    description?: string
    name: string
    columnNo: number
    columnName: string
    type: number
    required: boolean
    editable: boolean
    generalInfo: boolean
    personalInfo: boolean
    platformInfo: boolean
    information: any
    locked: boolean
    index: number
    isInvalided: boolean
    configFrame: Record<string, any> | null
}
export type FieldTypeName = 'number' | 'multiple_select' | 'single_select' | 'text' | 'date' | 'time' | 'month' | string
