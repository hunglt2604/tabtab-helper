<template>
    <div class="shadow-primary-01 rounded-lg w-full mb-4 bg-white" :class="[field.isInvalided && '!bg-[#f0f0f0]']">
        <el-form label-position="top" class="">
            <div class="flex">
                <div class="menu-options flex flex-col px-3 mr-3 py-3 bg-[#D9D9D9] rounded-l-lg justify-between">
                    <el-popover placement="top-start" :width="810" trigger="hover" :persistent="false">
                        <template #reference>
                            <div class="hover:cursor-pointer">
                                <Icon icon="ic:outline-info" height="20" />
                            </div>
                        </template>
                        <div class="grid grid-cols-3 w-full py-3 gap-6">
                            <div class="text-base break-normal">
                                <h3 class="font-semibold mb-2">Mã tính năng trong storage</h3>
                                <span class="flex">
                                    000000
                                    <span class="hover:cursor-pointer ml-2" @click="copyText('000000')">
                                        <Icon icon="ic:outline-content-copy" height="20" />
                                    </span>
                                </span>
                            </div>
                            <div class="text-base break-normal">
                                <h3 class="font-semibold mb-2">Mục đích sử dụng</h3>
                                <span class="">Sử dụng để tạo nhanh các trường cơ bản tùy biến theo nhu cầu thực tế</span>
                            </div>
                            <div class="text-base break-normal">
                                <h3 class="font-semibold mb-2">Mô tả điều kiện</h3>
                                <span class="">Không đồng bộ, chỉ áp dụng duy nhất tại cấu hình được cài đặt</span>
                            </div>
                        </div>
                    </el-popover>
                    <el-popover placement="right-end" :width="210" trigger="click" :persistent="false">
                        <template #reference>
                            <div class="hover:cursor-pointer">
                                <Icon icon="ic:outline-settings" height="20" />
                            </div>
                        </template>
                        <div class="">
                            <h4 class="text-sm text-secondary font-semibold text-center">Thao tác</h4>

                            <el-button
                                size="default"
                                class="w-full !ml-0 mt-3"
                                type="warning"
                                plain
                                v-if="!field.locked && !field.isInvalided"
                                @click="handleDeactive">
                                <Icon icon="ic:round-stop-circle" height="16" class="mr-2" /> Ngưng
                            </el-button>
                            <el-button
                                size="default"
                                class="w-full !ml-0 mt-3"
                                type="default"
                                v-if="field.locked"
                                plain
                                @click="handleUnlock">
                                <Icon icon="ic:twotone-lock-open" height="16" class="mr-2" /> Mở khóa
                            </el-button>
                            <el-button size="default" class="w-full !ml-0 mt-3" type="info" v-if="!field.locked" plain @click="handleLock">
                                <Icon icon="ic:twotone-lock" height="16" class="mr-2" /> Khóa
                            </el-button>
                            <el-button
                                size="default"
                                class="w-full !ml-0 mt-3"
                                type="success"
                                v-if="field.isInvalided"
                                plain
                                @click="handleActive">
                                <Icon icon="ic:round-restart-alt" height="16" class="mr-2" /> Kích hoạt
                            </el-button>
                            <el-button
                                size="default"
                                class="w-full !ml-0 mt-3"
                                type="danger"
                                v-if="field.isInvalided"
                                @click="$emit('delete')">
                                <Icon icon="ic:round-delete-forever" height="16" class="mr-2" /> Xóa
                            </el-button>
                        </div>
                    </el-popover>

                    <div class="h-5">
                        <el-tooltip effect="dark" content="Đã khóa" placement="right" v-if="field.locked">
                            <Icon icon="ic:twotone-lock" height="20" />
                        </el-tooltip>
                    </div>
                </div>
                <div class="grid grid-cols-3 w-full py-3 pr-3 gap-6">
                    <div class="">
                        <el-form-item label="Tên trường" class="!mb-0">
                            <el-input v-model="field.name" :disabled="field.isInvalided || field.locked"></el-input>
                        </el-form-item>
                        <el-form-item label="" class="!mb-0">
                            <el-checkbox label="Hiển thị tên trường" :disabled="field.isInvalided || field.locked"></el-checkbox>
                        </el-form-item>
                    </div>

                    <el-form-item label="Cách nhập liệu" class="!mb-0">
                        <el-select
                            v-model="field.type"
                            placeholder="Select"
                            class="w-full"
                            :disabled="field.isInvalided || field.locked"
                            :persistent="false">
                            <el-option v-for="option in inputTypeOptions" :key="option.key" :label="option.type" :value="option.key">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <div class="text-left">
                        <!-- <h4 class="text-sm text-secondary">Cách hiển thị</h4> -->
                        <el-form-item label="Cách hiển thị" class="!mb-0 w-full" v-if="getInputType(field.type) == 'text'">
                            <el-input placeholder="Eg. John Where" v-model="exampleTextbox"></el-input>
                        </el-form-item>
                        <el-form-item label="Cách hiển thị" class="!mb-0 w-full" v-else-if="getInputType(field.type) == 'number'">
                            <el-input placeholder="Eg. 0,100,..." type="number" v-model="exampleNumberbox"></el-input>
                        </el-form-item>
                        <el-form-item label="Cách hiển thị" class="!mb-0" v-else-if="getInputType(field.type) == 'multiple_select'">
                            <el-select
                                placeholder="Multiple select"
                                multiple
                                v-model="exampleMultiSelect"
                                class="w-full"
                                :persistent="false">
                                <el-option label="Option 1" value="Option 1"></el-option>
                                <el-option label="Option 2" value="Option 2"></el-option>
                                <el-option label="Option 3" value="Option 3"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="Cách hiển thị" class="!mb-0" v-else-if="getInputType(field.type) == 'date'">
                            <el-date-picker v-model="exampleDatePicker" type="date" placeholder="Pick a day" size="default" />
                        </el-form-item>
                    </div>
                </div>
            </div>
        </el-form>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
// import { systemConfigs } from '~/stores/config'
// import { useStore } from '@nanostores/vue'
import type { CustomFieldType, FieldTypeName } from '@/types'
// const $systemConfigs = useStore(systemConfigs)

const props = withDefaults(
    defineProps<{
        field: CustomFieldType
    }>(),
    {}
)

const emits = defineEmits<{
    (event: 'delete'): void
    (event: 'active'): void
    (event: 'deactive'): void
    (event: 'duplicate'): void
}>()

// const inputTypeOptions = computed(() => $systemConfigs.value?.customFields || [])
// const selectedType = computed(() => inputTypeOptions.value.filter((el) => props.field.type == el.key)[0])

const inputTypeOptions = ref<{ key: number; type: string }[]>([])
// const selectedType = ref<{ key: number; type: string }[]>([])

const exampleMultiSelect = ref()
const exampleTextbox = ref('')
const exampleNumberbox = ref('')
const exampleDatePicker = ref('')

function getInputType(key: number): FieldTypeName {
    return inputTypeOptions.value.filter((el) => el.key == key)[0]?.type
}

function copyText(text: string): void {
    navigator.clipboard.writeText(text)
    ElMessage({
        type: 'success',
        message: 'Copied',
    })
}

function handleDeactive(): void {
    props.field.isInvalided = true
    emits('deactive')
}

function handleActive(): void {
    props.field.isInvalided = false
    emits('active')
}

function handleUnlock(): void {
    props.field.locked = false
}
function handleLock(): void {
    props.field.locked = true
}
</script>

<style lang="scss" scoped></style>
