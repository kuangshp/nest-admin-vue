export const tableOptions = [
  {
    align: 'center',
    width: 50,
    type: 'selection',
    fixed: 'left',
  },
  {
    prop: 'name',
    label: '名称',
    width: 180,
  },
  {
    prop: 'tenantName',
    label: '所属商户',
    width: 180,
  },
  {
    prop: 'accountUsername',
    label: '所属账号',
    width: 180,
  },
  {
    prop: 'description',
    label: '描述',
    width: 180,
  },
  {
    prop: 'status',
    label: '状态',
  },
  {
    prop: 'sort',
    label: '排序',
    align: 'center',
  },
  {
    prop: 'createdAt',
    label: '创建时间',
    align: 'center',
    width: 180,
  },
  {
    prop: 'updatedAt',
    label: '更新时间',
    align: 'center',
    width: 180,
  },
  // {
  //   label: '操作',
  //   action: true,
  //   align: 'center',
  //   width: 300,
  //   fixed: 'right',
  // },
];
export const queryFormOption = [
  {
    type: 'input',
    label: '名称',
    prop: 'name',
  },
  {
    type: 'select',
    prop: 'status',
    label: '状态',
    children: [
      {
        type: 'option',
        label: '正常',
        value: '0',
      },
      {
        type: 'option',
        label: '禁用',
        value: '1',
      },
    ],
  },
];
export const formOption = [
  {
    type: 'input',
    label: '角色',
    prop: 'name',
    required: true,
  },
  {
    type: 'number',
    label: '排序',
    prop: 'sort',
  },
  {
    type: 'input',
    label: '描述',
    prop: 'description',
    attrs: {
      type: 'textarea',
    },
  },
];
