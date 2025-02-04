import { expect, test } from "vitest";
import ContactView from "./ContactView.vue";
import { mount } from "@vue/test-utils";

test("disabled submit button when invalid", async () => {
  const wrapper = mount(ContactView);
  await wrapper.find("input[name=email]").setValue("invalid-email");
  expect(wrapper.find("button[type=submit]").attributes("class")).toContain(
    "disabled"
  );
});
