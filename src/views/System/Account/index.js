export const tableOptions = [
  {
    align: 'center',
    width: 50,
    type: 'selection',
    fixed: 'left',
  },
  {
    prop: 'username',
    label: '用户名',
    width: 180,
  },
  {
    prop: 'parentName',
    label: '父节点',
  },
  {
    prop: 'tenantName',
    label: '所属商户',
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
    label: '用户名',
    prop: 'username',
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
    label: '用户名',
    prop: 'username',
    required: true,
  },
  {
    type: 'number',
    label: '排序',
    prop: 'sort',
  },
];
