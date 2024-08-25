import { currentStayType } from "../types/stay";
import authClient from "./client";
import { getCookie } from "./cookie";

export const getStay = async () => {
  const { data } = await authClient.get("/manage/stay");
  return data;
};

export const getStayCurrent = async () => {
  const { data } = await authClient.get<currentStayType>(
    "/manage/stay/current"
  );
  return data;
};

export const decideStayOutgo = async ({
  stayOutGoId,
  isApprove,
}: {
  stayOutGoId: string;
  isApprove: boolean;
}) => {
  const { data } = await authClient.patch(
    `/manage/stay/outgo/${stayOutGoId}?isApprove=${isApprove}`
  );
  return data;
};

export const makeStay = async () => {};

export const downloadStay = async ({ grade }: { grade: string }) => {
  const accessToken = await getCookie("jwt");

  var xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/manage/stay/current/excel/${grade}`,
    true
  );
  // 액세스 토큰을 요청 헤더에 포함
  xhr.setRequestHeader("Authorization", `Bearer ${accessToken}`);
  xhr.responseType = "blob";

  xhr.onload = function (e) {
    if (xhr.status === 200) {
      let blob = xhr.response;
      let contentDispo = xhr.getResponseHeader("Content-Disposition");
      let fileName = "download.xlsx"; // 기본 파일 이름
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
    var url = window.URL.createObjectURL(blob);
    var a = document.createElement("a");
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
