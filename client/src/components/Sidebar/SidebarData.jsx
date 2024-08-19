import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import { MdOutlinePointOfSale } from "react-icons/md";

export const SidebarData = [
  {
    title: 'Seguridad',
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Usuarios',
        path: '/overview/users',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Roles',
        path: '/overview/revenue',
        icon: <IoIcons.IoIosPaper />
      }
    ]
  },
  {
    title: 'Inventario',
    path: '/Inventario',
    icon: <FaIcons.FaCartPlus />
  },
  {
    title: 'Factura',
    path: '/factura',
    icon: <MdOutlinePointOfSale />
  },
  {
    title: 'Clientes',
    path: '/team',
    icon: <IoIcons.IoMdPeople />
  },
  {
    title: 'Parámetros',
    path: '/team',
    icon: <IoIcons.IoMdPeople />
  },
];