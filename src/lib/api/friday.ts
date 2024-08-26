import { currentFrigoType, frigoType } from "../types/friday";
import authClient from "./client";
import {getCookie} from "@/lib/api/cookie";

export const getFridayCurrentOuting = async () => {
  const res = await authClient.get<currentFrigoType>("/manage/frigo/current");
  return res;
};
export const getAllFridayOuting = async () => {
  const res = await authClient.get<frigoType[]>("/manage/frigo");
  return res;
};
export const setFrigo = async ({ id }: { id: string }) => {
  const { data } = await authClient.patch("/manage/frigo/current/" + id);
  return data;
};

export const unSetFrigo = async ({ id }: { id: string }) => {
  const { data } = await authClient.delete("/manage/frigo/current/" + id);
  return data;
};

export const makeFrigo = async ({ date }: { date: string }) => {
  const { data } = await authClient.post("/manage/frigo", { date });
  return data;
};

export const deleteFrigo = async ({ id }: { id: string }) => {
  const { data } = await authClient.delete("/manage/frigo/" + id);
  return data;
};

export const decideFrigo = async ({
  frigoId,
  studentId,
  isApproved,
}: {
  frigoId: string;
  studentId: string;
  isApproved: boolean;
}) => {
  console.log({
    frigoId,
    studentId,
    isApproved,
  });
  const { data } = await authClient.patch(
    `/manage/frigo/${frigoId}/${studentId}?approve=${isApproved}`
  );
  return data;
};

export const downloadFrigo = async (frigoId: string) => {
  const accessToken = await getCookie("jwt");

  var xhr = new XMLHttpRequest();
  xhr.open(
      "GET",
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/manage/frigo/${frigoId}/excel`,
      true
  );
  // 액세스 토큰을 요청 헤더에 포함
  xhr.setRequestHeader("Authorization", `Bearer ${accessToken}`);
  xhr.responseType = "blob";

  xhr.onload = function (e) {
    if (xhr.status === 200) {
      let blob = xhr.response;
      let contentDispo = xhr.getResponseHeader("Content-Disposition");
      let fileName = `3학년 금요귀가표.xlsx`; // 기본 파일 이름
      if (contentDispo) {
        let matches = contentDispo.match(
            /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
        );
        if (matches != null && matches[1]) {
          fileName = decodeURI(matches[1].replace(/['"]/g, ""));
        }
      }

      saveOrOpenBlob(blob, fileName);
    } else {
      console.error("File download failed with status: " + xhr.status);
    }
  };

  xhr.send();

  function saveOrOpenBlob(blob: Blob | MediaSource, fileName: string) {
    let url = window.URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }, 0);
  }
};

