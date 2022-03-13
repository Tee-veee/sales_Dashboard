export const filterUserSales = (
  type,
  sortConditions,
  setSortConditions,
  userSalesList,
  setUserSalesList
) => {
  const setList = (sortedList, a, b, c, d) => {
    setUserSalesList([]);
    setTimeout(() => {
      setUserSalesList(sortedList);
    }, 100);
    setSortConditions({
      nameSort: a,
      emailSort: b,
      grandSort: c,
      dateSort: d,
    });
  };
  if (type === "clientName") {
    const compareClientName = (a, b) => {
      const nameArrA = a.salesClient.split(" ");
      const nameArrB = b.salesClient.split(" ");
      if (nameArrA[0] < nameArrB[0]) {
        return -1;
      }
      if (nameArrA[0] > nameArrB[0]) {
        return 1;
      }
      return 0;
    };

    const sortedList = userSalesList.sort(compareClientName);
    if (sortConditions.nameSort === true) return;
    setList(sortedList, true, false, false, false);
  } else if (type === "clientEmail") {
    const compareEmail = (a, b) => {
      const nameArrA = a.salesClientEmail.split(" ");
      const nameArrB = b.salesClientEmail.split(" ");

      if (nameArrA[0] < nameArrB[0]) {
        return -1;
      }
      if (nameArrA[0] > nameArrB[0]) {
        return 1;
      }
      return 0;
    };
    const sortedList = userSalesList.sort(compareEmail);
    if (sortConditions.emailSort === true) return;
    setList(sortedList, false, true, false, false);
  } else if (type === "grandTotal") {
    const sortedList = userSalesList.sort((a, b) => {
      return b.grandTotal - a.grandTotal;
    });
    if (sortConditions.grandSort === true) return;
    setList(sortedList, false, false, true, false);
  } else if (type === "saleDate") {
    const sortedList = userSalesList.sort((a, b) => {
      const date1 = new Date(a.date);
      const date2 = new Date(b.date);

      return date2 - date1;
    });
    if (sortConditions.dateSort === true) return;
    setList(sortedList, false, false, false, true);
  }
};

export const filterSuppliers = (
  type,
  sortConditions,
  setSortConditions,
  supplierList,
  setSupplierList
) => {
  const setList = (sortedList, a, b, c, d, e) => {
    setSupplierList([]);
    setTimeout(() => {
      setSupplierList(sortedList);
    }, 100);
    setSortConditions({
      nameSort: a,
      emailSort: b,
      phoneSort: c,
      postSort: d,
      catSort: e,
    });
  };

  if (type === "supplierName") {
    const compareSupplierName = (a, b) => {
      const nameArrA = a.supplierName.split(" ");
      const nameArrB = b.supplierName.split(" ");
      if (nameArrA[0] < nameArrB[0]) {
        return -1;
      }
      if (nameArrA[0] > nameArrB[0]) {
        return 1;
      }
      return 0;
    };

    const sortedList = supplierList.sort(compareSupplierName);
    if (sortConditions.nameSort === true) return;
    setList(sortedList, true, false, false, false, false);
  } else if (type === "supplierEmail") {
    const compareEmail = (a, b) => {
      const nameArrA = a.supplierEmail.split(" ");
      const nameArrB = b.supplierEmail.split(" ");

      if (nameArrA[0] < nameArrB[0]) {
        return -1;
      }
      if (nameArrA[0] > nameArrB[0]) {
        return 1;
      }
      return 0;
    };
    const sortedList = supplierList.sort(compareEmail);
    if (sortConditions.emailSort === true) return;
    setList(sortedList, false, true, false, false, false);
  } else if (type === "supplierPhone") {
    const comparePhone = (a, b) => {
      const nameArrA = a.supplierPhone.split("");
      const nameArrB = b.supplierPhone.split("");

      if (nameArrA[2] < nameArrB[2]) {
        return -1;
      }
      if (nameArrA[2] > nameArrB[2]) {
        return 1;
      }
      if (nameArrA[3] < nameArrB[3]) {
        return -1;
      }
      if (nameArrA[3] > nameArrB[3]) {
        return 1;
      }
      if (nameArrA[4] < nameArrB[4]) {
        return -1;
      }
      if (nameArrA[4] > nameArrB[4]) {
        return 1;
      }
      if (nameArrA[5] < nameArrB[5]) {
        return -1;
      }
      if (nameArrA[5] > nameArrB[5]) {
        return 1;
      }
      if (nameArrA[6] < nameArrB[6]) {
        return -1;
      }
      if (nameArrA[6] > nameArrB[6]) {
        return 1;
      }
      if (nameArrA[7] < nameArrB[7]) {
        return -1;
      }
      if (nameArrA[7] > nameArrB[7]) {
        return 1;
      }
      if (nameArrA[8] < nameArrB[8]) {
        return -1;
      }
      if (nameArrA[8] > nameArrB[8]) {
        return 1;
      }
    };
    const sortedList = supplierList.sort(comparePhone);
    if (sortConditions.phoneSort === true) return;
    setList(sortedList, false, false, true, false, false);
  } else if (type === "Postcode") {
    const sortedList = supplierList.sort((a, b) => {
      return b.supplierPostcode - a.supplierPostcode;
    });
    if (sortConditions.postSort === true) return;

    setList(sortedList, false, false, false, true, false);
  } else if (type === "Category") {
    const compareCategory = (a, b) => {
      const nameArrA = a.supplierCategory.split(" ");
      const nameArrB = b.supplierCategory.split(" ");

      if (nameArrA[0] < nameArrB[0]) {
        return -1;
      }
      if (nameArrA[0] > nameArrB[0]) {
        return 1;
      }
      return 0;
    };
    const sortedList = supplierList.sort(compareCategory);
    if (sortConditions.catSort === true) return;
    setList(sortedList, false, false, false, false, true);
  }
};

export const filterClients = (
  type,
  sortConditions,
  setSortConditions,
  clientListShort,
  setClientListShort
) => {
  const setList = (sortedList, a, b, c, d) => {
    setClientListShort([]);
    setTimeout(() => {
      setClientListShort(sortedList);
    }, 100);
    setSortConditions({
      nameSort: a,
      emailSort: b,
      postSort: c,
      typeSort: d,
    });
  };

  if (type === "clientName") {
    const compareClientName = (a, b) => {
      const nameArrA = a.clientName.split(" ");
      const nameArrB = b.clientName.split(" ");
      if (nameArrA[0] < nameArrB[0]) {
        return -1;
      }
      if (nameArrA[0] > nameArrB[0]) {
        return 1;
      }
      return 0;
    };

    const sortedList = clientListShort.sort(compareClientName);
    if (sortConditions.nameSort === true) return;
    setList(sortedList, true, false, false, false);
  } else if (type === "clientEmail") {
    const compareEmail = (a, b) => {
      const nameArrA = a.clientEmail.split(" ");
      const nameArrB = b.clientEmail.split(" ");

      if (nameArrA[0] < nameArrB[0]) {
        return -1;
      }
      if (nameArrA[0] > nameArrB[0]) {
        return 1;
      }
      return 0;
    };
    const sortedList = clientListShort.sort(compareEmail);
    if (sortConditions.emailSort === true) return;
    setList(sortedList, false, true, false, false);
  } else if (type === "Postcode") {
    const sortedList = clientListShort.sort((a, b) => {
      return b.clientPostcode - a.clientPostcode;
    });
    if (sortConditions.postSort === true) return;
    setList(sortedList, false, false, true, false);
  } else if (type === "clientType") {
    const sortedList = clientListShort.sort((a, b) => {
      if (a.clientType < b.clientType) {
        return -1;
      }
      if (a.clientType > b.clientType) {
        return 1;
      }
      return 0;
    });
    if (sortConditions.typeSort === true) return;

    setList(sortedList, false, false, false, true);
  }
};

export const filterProducts = (
  type,
  sortConditions,
  setSortConditions,
  productsList,
  setProductsList
) => {
  const setList = (sortedList, a, b, c, d) => {
    setProductsList([]);
    setTimeout(() => {
      setProductsList(sortedList);
    }, 100);
    setSortConditions({
      nameSort: a,
      catSort: b,
      priceSort: c,
      margSort: d,
    });
  };

  if (type === "productName") {
    const compareProductName = (a, b) => {
      const nameArrA = a.productName.split(" ");
      const nameArrB = b.productName.split(" ");
      if (nameArrA[0] < nameArrB[0]) {
        return -1;
      }
      if (nameArrA[0] > nameArrB[0]) {
        return 1;
      }
      return 0;
    };

    const sortedList = productsList.sort(compareProductName);
    if (sortConditions.nameSort === true) return;
    setList(sortedList, true, false, false, false);
  } else if (type === "productCategory") {
    const compareCategory = (a, b) => {
      const nameArrA = a.productCategory.split(" ");
      const nameArrB = b.productCategory.split(" ");

      if (nameArrA[0] < nameArrB[0]) {
        return -1;
      }
      if (nameArrA[0] > nameArrB[0]) {
        return 1;
      }
      return 0;
    };
    const sortedList = productsList.sort(compareCategory);
    if (sortConditions.catSort === true) return;
    setList(sortedList, false, true, false, false);
  } else if (type === "costPrice") {
    const sortedList = productsList.sort((a, b) => {
      return b.productCostPrice - a.productCostPrice;
    });
    if (sortConditions.priceSort === true) return;
    setList(sortedList, false, false, true, false);
  } else if (type === "%Margain") {
    const sortedList = productsList.sort((a, b) => {
      return b.productProfitMargain - a.productProfitMargain;
    });
    if (sortConditions.dateSort === true) return;

    setList(sortedList, false, false, false, true);
  }
};

export const filterSales = (
  type,
  sortConditions,
  setSortConditions,
  salesList,
  setSalesList
) => {
  const setList = (sortedList, a, b, c, d) => {
    setSalesList([]);
    setTimeout(() => {
      setSalesList(sortedList);
    }, 100);
    setSortConditions({
      salesSort: a,
      clientSort: b,
      grandSort: c,
      dateSort: d,
    });
  };

  if (type === "salesPerson") {
    const compareSalesPerson = (a, b) => {
      const nameArrA = a.salesPerson.split(" ");
      const nameArrB = b.salesPerson.split(" ");

      if (nameArrA[0] < nameArrB[0]) {
        return -1;
      }
      if (nameArrA[0] > nameArrB[0]) {
        return 1;
      }
      return 0;
    };
    const sortedList = salesList.sort(compareSalesPerson);
    if (sortConditions.salesSort === true) return;
    setList(sortedList, true, false, false, false);
  } else if (type === "clientName") {
    const compareClient = (a, b) => {
      const nameArrA = a.salesClient.split(" ");
      const nameArrB = b.salesClient.split(" ");

      if (nameArrA[0] < nameArrB[0]) {
        return -1;
      }
      if (nameArrA[0] > nameArrB[0]) {
        return 1;
      }
      return 0;
    };
    const sortedList = salesList.sort(compareClient);
    if (sortConditions.clientSort === true) return;
    setList(sortedList, false, true, false, false);
  } else if (type === "grandTotal") {
    const sortedList = salesList.sort((a, b) => {
      return b.grandTotal - a.grandTotal;
    });
    if (sortConditions.grandSort === true) return;
    setList(sortedList, false, false, true, false);
  } else if (type === "saleDate") {
    const sortedList = salesList.sort((a, b) => {
      const date1 = new Date(a.date);
      const date2 = new Date(b.date);

      return date2 - date1;
    });
    if (sortConditions.dateSort === true) return;
    setList(sortedList, false, false, false, true);
  }
};
