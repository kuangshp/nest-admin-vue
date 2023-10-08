export const tableOptions = [
  {
    prop: 'name',
    label: '商户名称',
    width: 180,
  },
  {
    prop: 'username',
    label: '联系人',
    width: 180,
  },
  {
    prop: 'mobile',
    label: '联系人电话',
    width: 180,
  },
  {
    prop: 'accountTotal',
    label: '账号数量',
    width: 100,
    slot: 'accountTotal',
    align: 'center',
  },
  {
    prop: 'roleName',
    label: '角色名称',
    width: 120,
  },
  // {
  //   prop: 'email',
  //   label: '电邮',
  // },
  // {
  //   prop: 'avatar',
  //   label: '头像',
  //   width: 180,
  // },
  {
    prop: 'balance',
    label: '余额',
    width: 100,
    align: 'center',
    slot: 'balance',
  },
  // {
  //   prop: 'legalPerson',
  //   label: '法人',
  // },
  // {
  //   prop: 'businessLicenseUrl',
  //   label: '营业执照',
  // },
  // {
  //   prop: 'address',
  //   label: '地址',
  // },
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
    prop: 'description',
    label: '描述',
    align: 'center',
    width: 180,
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
  {
    label: '操作',
    action: true,
    align: 'center',
    width: 300,
    fixed: 'right',
  },
];
export const queryFormOption = [
  {
    type: 'input',
    label: '商户名称',
    prop: 'name',
  },
  {
    type: 'input',
    label: '联系人',
    prop: 'username',
  },
  {
    type: 'input',
    label: '联系人电话',
    prop: 'mobile',
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
